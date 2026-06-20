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
    ortho = cross_product(v, [1, 0, 0])
    if math.sqrt(sum(x*x for x in ortho)) < 0.1:
        ortho = cross_product(v, [0, 1, 0])
    return normalize(ortho)

def rotate_vec(v, axis, angle_rad):
    # Rodrigues' rotation formula
    cos_a = math.cos(angle_rad)
    sin_a = math.sin(angle_rad)
    axis = normalize(axis)

    # v * cos_a + (axis x v) * sin_a + axis * (axis . v) * (1 - cos_a)
    term1 = scale_vec(v, cos_a)
    term2 = scale_vec(cross_product(axis, v), sin_a)
    dot = sum(x*y for x, y in zip(axis, v))
    term3 = scale_vec(axis, dot * (1 - cos_a))

    return add_vec(add_vec(term1, term2), term3)

def calculate_h_positions(atom_pos, neighbor_positions, num_h, element):
    # Bond lengths
    lengths = {'C': 1.09, 'N': 1.01, 'O': 0.96, 'S': 1.33, 'SE': 1.47}
    h_dist = lengths.get(element.upper(), 1.0)

    if not neighbor_positions:
        # Fallback if no neighbors (not expected)
        return [add_vec(atom_pos, [h_dist, 0, 0])]

    vecs = [normalize(sub_vec(p, atom_pos)) for p in neighbor_positions]
    avg_vec = [sum(v[i] for v in vecs)/len(vecs) for i in range(3)]

    # Direction to place H (opposite to neighbors)
    h_dir_base = scale_vec(avg_vec, -1)
    if math.sqrt(sum(x*x for x in h_dir_base)) < 0.001:
        # Perfectly balanced neighbors (like linear), find any orthogonal
        h_dir_base = get_orthogonal(vecs[0])
    else:
        h_dir_base = normalize(h_dir_base)

    if num_h == 1:
        if len(vecs) == 1:
            # Case like -O-H or -S-H. Needs bent angle (~109.5)
            # Pick an arbitrary orthogonal vector to rotate around
            ortho = get_orthogonal(vecs[0])
            # Rotate -vecs[0] by ~70.5 degrees (180-109.5)
            h_dir = rotate_vec(scale_vec(vecs[0], -1), ortho, math.radians(70.5))
            return [add_vec(atom_pos, scale_vec(h_dir, h_dist))]
        elif len(vecs) == 2:
            # Case like >C-H. H should be in the plane bisecting the neighbors
            return [add_vec(atom_pos, scale_vec(h_dir_base, h_dist))]
        elif len(vecs) == 3:
            # Case like >C-H (tertiary). H opposite to the tripod
            return [add_vec(atom_pos, scale_vec(h_dir_base, h_dist))]

    if num_h == 2:
        if len(vecs) == 1:
            # Case like -NH2. Sp3-like.
            # Angle between H-N-H should be 109.5. Angle H-N-C also ~109.5.
            ortho = get_orthogonal(vecs[0])
            # Rotate h_dir_base around ortho and -ortho by half of 109.5
            rot_axis = ortho
            h1_dir = rotate_vec(h_dir_base, rot_axis, math.radians(109.5/2))
            h2_dir = rotate_vec(h_dir_base, rot_axis, math.radians(-109.5/2))
            return [add_vec(atom_pos, scale_vec(h1_dir, h_dist)), add_vec(atom_pos, scale_vec(h2_dir, h_dist))]
        elif len(vecs) == 2:
            # Case like -CH2-.
            # Neighbors define a plane. H atoms should be above/below this plane.
            # Plane normal
            norm = normalize(cross_product(vecs[0], vecs[1]))
            # The h_dir_base is already the bisector.
            # We need to rotate h_dir_base towards norm and -norm.
            # Angle between H atoms is 109.5.
            # In a tetrahedron, the angle between the bisector of two bonds
            # and the bonds themselves is half the tetrahedral angle ONLY if we
            # rotate into the correct plane.
            # Actually, the angle between the bisector of two legs and the other two legs
            # (which are also bisected by the same line in the other plane) is 90 degrees? No.
            # In CH4, C is at origin. Neighbors at (1,1,1), (1,-1,-1), (-1,1,-1), (-1,-1,1)
            # Bisector of first two is (1,0,0). Bisector of last two is (-1,0,0).
            # The angle from (1,0,0) to (1,1,1) is acos(1/sqrt(3)) = 54.74 degrees.
            # 2 * 54.74 = 109.48. Correct.
            # So we rotate h_dir_base around the other bisector (which is perp to both h_dir_base and norm)
            # Wait, the rotation axis should be the norm of the plane of current neighbors? No.
            # Let's just use the norm as rotation axis.
            # We want H1, H2 such that angle(H1, H2) = 109.5 and they are symmetric about h_dir_base
            # and the plane (H1, atom, H2) is perpendicular to plane(N1, atom, N2).
            # The direction of H1+H2 is h_dir_base.
            # The direction of H1-H2 is norm.
            # H1 = cos(109.5/2) * h_dir_base + sin(109.5/2) * norm
            # H2 = cos(109.5/2) * h_dir_base - sin(109.5/2) * norm
            c = math.cos(math.radians(109.5/2))
            s = math.sin(math.radians(109.5/2))
            h1_dir = add_vec(scale_vec(h_dir_base, c), scale_vec(norm, s))
            h2_dir = add_vec(scale_vec(h_dir_base, c), scale_vec(norm, -s))
            return [add_vec(atom_pos, scale_vec(h1_dir, h_dist)), add_vec(atom_pos, scale_vec(h2_dir, h_dist))]

    if num_h == 3:
        # Case like -CH3.
        # H1 is in a plane, H2, H3 rotated by 120.
        # Let's just place H1 at h_dir_base then rotate? No, that's not tetrahedral.
        # In -CH3, neighbors = 1.
        # h_dir_base is opposite to neighbor.
        # H atoms are at 109.5 to the neighbor, so 180-109.5 = 70.5 to h_dir_base? No.
        # Angle(Neighbor, C, H) = 109.5.
        # So H is rotated 109.5 from Neighbor.
        axis = get_orthogonal(vecs[0])
        h1_dir = rotate_vec(vecs[0], axis, math.radians(109.5))
        h2_dir = rotate_vec(h1_dir, vecs[0], math.radians(120))
        h3_dir = rotate_vec(h2_dir, vecs[0], math.radians(120))
        return [add_vec(atom_pos, scale_vec(h1_dir, h_dist)),
                add_vec(atom_pos, scale_vec(h2_dir, h_dist)),
                add_vec(atom_pos, scale_vec(h3_dir, h_dist))]

    return [add_vec(atom_pos, scale_vec(h_dir_base, h_dist)) for _ in range(num_h)]

def process_amino_acids(filepath):
    with open(filepath, 'r') as f:
        data = json.load(f)

    valencies = {'C': 4, 'N': 3, 'O': 2, 'S': 2, 'SE': 2}

    for aa in data:
        atoms = aa['atoms']
        bonds = aa['bonds']

        new_atoms = [a for a in atoms if a['element'] != 'H']
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

        h_to_add = []
        for i, atom in enumerate(aa['atoms']):
            element = atom['element'].upper()
            target_valency = valencies.get(element, 0)
            if target_valency == 0: continue

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
                h_positions = calculate_h_positions(atom_pos, neighbor_positions, num_h, element)

                for pos in h_positions:
                    h_to_add.append({
                        'element': 'H',
                        'x': round(pos[0], 3),
                        'y': round(pos[1], 3),
                        'z': round(pos[2], 3),
                        'parent': i
                    })

        for h in h_to_add:
            parent_idx = h.pop('parent')
            h_idx = len(aa['atoms'])
            aa['atoms'].append(h)
            aa['bonds'].append({'from': parent_idx, 'to': h_idx, 'order': 1})

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    process_amino_acids('src/data/amino-acids.json')
