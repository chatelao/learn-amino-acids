import json
import math

def normalize(v):
    mag = math.sqrt(sum(x*x for x in v))
    if mag == 0: return v
    return [x/mag for x in v]

def cross(a, b):
    return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
    ]

def add_v(a, b):
    return [a[i] + b[i] for i in range(len(a))]

def sub_v(a, b):
    return [a[i] - b[i] for i in range(len(a))]

def mul_v(a, s):
    return [x*s for x in a]

def add_hydrogens_to_aa(aa):
    atoms = aa['atoms']
    bonds = aa['bonds']

    adj = {i: [] for i in range(len(atoms))}
    for b in bonds:
        adj[b['from']].append((b['to'], b['order']))
        adj[b['to']].append((b['from'], b['order']))

    valencies = {'C': 4, 'N': 3, 'O': 2, 'S': 2, 'Se': 2}

    new_atoms = [dict(a) for a in atoms]
    new_bonds = [dict(b) for b in bonds]

    for i, atom in enumerate(atoms):
        element = atom['element']
        if element not in valencies: continue

        current_valency = sum(order for _, order in adj[i])
        needed = valencies[element] - current_valency

        if needed <= 0: continue

        pos = [atom['x'], atom['y'], atom['z']]
        neighbors = [[atoms[n]['x'], atoms[n]['y'], atoms[n]['z']] for n, _ in adj[i]]

        h_positions = []
        if not neighbors:
            # Isolated atom
            h_positions.append(add_v(pos, [1.0, 0, 0]))
        else:
            dirs = [normalize(sub_v(n, pos)) for n in neighbors]

            if needed == 1:
                avg_dir = [0, 0, 0]
                for d in dirs: avg_dir = add_v(avg_dir, d)
                target_dir = normalize(mul_v(avg_dir, -1))
                h_positions.append(add_v(pos, mul_v(target_dir, 1.0)))
            elif needed == 2:
                if len(dirs) == 1:
                    d1 = dirs[0]
                    if abs(d1[1]) < 0.9:
                        v_ortho = [0, 1, 0]
                    else:
                        v_ortho = [1, 0, 0]
                    v2 = normalize(cross(d1, v_ortho))
                    h_positions.append(add_v(pos, mul_v(normalize(add_v(mul_v(d1, -0.33), mul_v(v2, 0.94))), 1.0)))
                    h_positions.append(add_v(pos, mul_v(normalize(sub_v(mul_v(d1, -0.33), mul_v(v2, 0.94))), 1.0)))
                else:
                    # Place in plane bisecting existing bonds
                    avg_dir = [0, 0, 0]
                    for d in dirs: avg_dir = add_v(avg_dir, d)
                    target_dir = normalize(mul_v(avg_dir, -1))
                    perp = normalize(cross(dirs[0], dirs[1]))
                    h_positions.append(add_v(pos, mul_v(normalize(add_v(target_dir, mul_v(perp, 0.5))), 1.0)))
                    h_positions.append(add_v(pos, mul_v(normalize(sub_v(target_dir, mul_v(perp, 0.5))), 1.0)))
            elif needed == 3:
                d1 = dirs[0]
                if abs(d1[1]) < 0.9:
                    v_ortho = [0, 1, 0]
                else:
                    v_ortho = [1, 0, 0]
                v2 = normalize(cross(d1, v_ortho))
                v3 = normalize(cross(d1, v2))
                for angle in [0, 120, 240]:
                    rad = math.radians(angle)
                    h_dir = normalize(add_v(mul_v(d1, -0.33), add_v(mul_v(v2, 0.94 * math.cos(rad)), mul_v(v3, 0.94 * math.sin(rad)))))
                    h_positions.append(add_v(pos, mul_v(h_dir, 1.0)))

        for h_pos in h_positions:
            h_idx = len(new_atoms)
            new_atoms.append({
                'element': 'H',
                'x': round(h_pos[0], 2),
                'y': round(h_pos[1], 2),
                'z': round(h_pos[2], 2)
            })
            new_bonds.append({'from': i, 'to': h_idx, 'order': 1})

    aa['atoms'] = new_atoms
    aa['bonds'] = new_bonds

def main():
    with open('src/data/amino-acids.json', 'r') as f:
        data = json.load(f)
    # Filter out existing hydrogens first to avoid duplicates or issues with re-running
    for aa in data:
        heavy_atoms = []
        heavy_indices = []
        for i, a in enumerate(aa['atoms']):
            if a['element'] != 'H':
                heavy_atoms.append(a)
                heavy_indices.append(i)

        index_map = {old_i: new_i for new_i, old_i in enumerate(heavy_indices)}

        heavy_bonds = []
        for b in aa['bonds']:
            if b['from'] in index_map and b['to'] in index_map:
                heavy_bonds.append({
                    'from': index_map[b['from']],
                    'to': index_map[b['to']],
                    'order': b['order']
                })

        aa['atoms'] = heavy_atoms
        aa['bonds'] = heavy_bonds

        add_hydrogens_to_aa(aa)

    with open('src/data/amino-acids.json', 'w') as f:
        json.dump(data, f, indent=2)
    print("Successfully added hydrogens to amino acids.")

if __name__ == '__main__':
    main()
