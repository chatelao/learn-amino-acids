import json
import math
import os

def normalize(v):
    norm = math.sqrt(sum(x*x for x in v))
    if norm == 0: return [0, 0, 0]
    return [x/norm for x in v]

def add_vec(v1, v2):
    return [v1[0]+v2[0], v1[1]+v2[1], v1[2]+v2[2]]

def sub_vec(v1, v2):
    return [v1[0]-v2[0], v1[1]-v2[1], v1[2]-v2[2]]

def scale_vec(v, s):
    return [x*s for x in v]

def cross_product(v1, v2):
    return [
        v1[1]*v2[2] - v1[2]*v2[1],
        v1[2]*v2[0] - v1[0]*v2[2],
        v1[0]*v2[1] - v1[1]*v2[0]
    ]

def get_orthogonal(v):
    # Try [1, 0, 0]
    ortho = cross_product(v, [1, 0, 0])
    if math.sqrt(sum(x*x for x in ortho)) < 0.1:
        # If v is parallel to [1,0,0], use [0,1,0]
        ortho = cross_product(v, [0, 1, 0])
    return normalize(ortho)

def calculate_h_positions(atom_pos, neighbor_positions, num_h):
    if not neighbor_positions:
        # Should not happen in this project
        return [[atom_pos[0]+1, atom_pos[1], atom_pos[2]] for _ in range(num_h)]

    # Vectors from atom to neighbors
    vecs = [normalize(sub_vec(p, atom_pos)) for p in neighbor_positions]

    # Average direction of neighbors
    avg_vec = [sum(v[i] for v in vecs)/len(vecs) for i in range(3)]

    # Direction to place H (opposite to neighbors)
    h_dir_base = normalize(scale_vec(avg_vec, -1))

    if num_h == 1:
        if math.sqrt(sum(x*x for x in avg_vec)) < 0.01 and len(vecs) == 2:
            # Linear arrangement, pick an arbitrary orthogonal direction
            h_dir = get_orthogonal(vecs[0])
        else:
            h_dir = h_dir_base
        return [add_vec(atom_pos, scale_vec(h_dir, 1.0))]

    if num_h == 2:
        if len(vecs) == 1:
            # Sp3 nitrogen or oxygen at end of chain
            # Place two H at ~109.5 degrees from the neighbor
            ortho1 = get_orthogonal(vecs[0])
            ortho2 = cross_product(vecs[0], ortho1)
            # angle is 109.5 -> cos(109.5) = -1/3
            # H = -1/3 * neighbor_dir + sqrt(8/9) * ortho
            h1_dir = normalize(add_vec(scale_vec(vecs[0], -0.333), scale_vec(ortho1, 0.942)))
            h2_dir = normalize(add_vec(scale_vec(vecs[0], -0.333), scale_vec(ortho1, -0.942)))
            return [add_vec(atom_pos, scale_vec(h1_dir, 1.0)), add_vec(atom_pos, scale_vec(h2_dir, 1.0))]
        elif len(vecs) == 2:
            # Sp3 carbon/nitrogen in chain
            # Place two H perpendicular to the plane of neighbors
            plane_norm = normalize(cross_product(vecs[0], vecs[1]))
            # Adjust h_dir_base to be halfway between the plane_norm and its negative
            h1_dir = normalize(add_vec(scale_vec(h_dir_base, 0.5), scale_vec(plane_norm, 0.866)))
            h2_dir = normalize(add_vec(scale_vec(h_dir_base, 0.5), scale_vec(plane_norm, -0.866)))
            return [add_vec(atom_pos, scale_vec(h1_dir, 1.0)), add_vec(atom_pos, scale_vec(h2_dir, 1.0))]

    if num_h == 3:
        # Only for NH3+ maybe, but we use neutral NH2.
        # If we had NH3+:
        ortho1 = get_orthogonal(vecs[0])
        ortho2 = cross_product(vecs[0], ortho1)
        # 120 degrees apart in the plane perp to neighbor
        h1_dir = normalize(add_vec(scale_vec(vecs[0], -0.333), scale_vec(ortho1, 0.942)))
        # h2 is h1 rotated by 120 around vecs[0]
        # simplified:
        h2_dir = normalize(add_vec(add_vec(scale_vec(vecs[0], -0.333), scale_vec(ortho1, -0.471)), scale_vec(ortho2, 0.816)))
        h3_dir = normalize(add_vec(add_vec(scale_vec(vecs[0], -0.333), scale_vec(ortho1, -0.471)), scale_vec(ortho2, -0.816)))
        return [add_vec(atom_pos, scale_vec(h1_dir, 1.0)), add_vec(atom_pos, scale_vec(h2_dir, 1.0)), add_vec(atom_pos, scale_vec(h3_dir, 1.0))]

    # Default fallback
    return [add_vec(atom_pos, scale_vec(h_dir_base, 1.0)) for _ in range(num_h)]

def process_amino_acids(filepath):
    with open(filepath, 'r') as f:
        data = json.load(f)

    valencies = {'C': 4, 'N': 3, 'O': 2, 'S': 2, 'SE': 2}

    for aa in data:
        atoms = aa['atoms']
        bonds = aa['bonds']

        # Remove existing hydrogens to avoid duplicates if rerun
        new_atoms = [a for a in atoms if a['element'] != 'H']
        # Map old indices to new indices
        index_map = {}
        curr = 0
        for i, a in enumerate(atoms):
            if a['element'] != 'H':
                index_map[i] = curr
                curr += 1

        new_bonds = []
        for b in bonds:
            if b['from'] in index_map and b['to'] in index_map:
                new_bonds.append({
                    'from': index_map[b['from']],
                    'to': index_map[b['to']],
                    'order': b['order']
                })

        aa['atoms'] = new_atoms
        aa['bonds'] = new_bonds

        # Calculate missing hydrogens
        h_to_add = []
        for i, atom in enumerate(aa['atoms']):
            element = atom['element'].upper()
            target_valency = valencies.get(element, 0)
            if target_valency == 0: continue

            # Count current bonds
            current_valency = 0
            neighbors = []
            for b in aa['bonds']:
                if b['from'] == i:
                    current_valency += b['order']
                    neighbors.append(aa['atoms'][b['to']])
                elif b['to'] == i:
                    current_valency += b['order']
                    neighbors.append(aa['atoms'][b['from']])

            num_h = target_valency - current_valency
            if num_h > 0:
                neighbor_positions = [[n['x'], n['y'], n['z']] for n in neighbors]
                atom_pos = [atom['x'], atom['y'], atom['z']]
                h_positions = calculate_h_positions(atom_pos, neighbor_positions, num_h)

                for pos in h_positions:
                    h_to_add.append({
                        'element': 'H',
                        'x': round(pos[0], 3),
                        'y': round(pos[1], 3),
                        'z': round(pos[2], 3),
                        'parent': i
                    })

        # Add H atoms and bonds
        for h in h_to_add:
            parent_idx = h.pop('parent')
            h_idx = len(aa['atoms'])
            aa['atoms'].append(h)
            aa['bonds'].append({'from': parent_idx, 'to': h_idx, 'order': 1})

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    process_amino_acids('src/data/amino-acids.json')
