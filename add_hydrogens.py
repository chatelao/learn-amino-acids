import json
import math

def add_hydrogens(aa_list):
    # Standard bond lengths
    # C-H ~ 1.09, N-H ~ 1.01, O-H ~ 0.96, S-H ~ 1.34
    bond_lengths = {
        'C': 1.09,
        'N': 1.01,
        'O': 0.96,
        'S': 1.34,
        'SE': 1.46
    }

    for aa in aa_list:
        atoms = aa['atoms']
        bonds = aa['bonds']

        # Track connections
        connections = [[] for _ in range(len(atoms))]
        for bond in bonds:
            connections[bond['from']].append(bond['to'])
            connections[bond['to']].append(bond['from'])

        new_atoms = atoms[:]
        new_bonds = bonds[:]

        for i, atom in enumerate(atoms):
            element = atom['element'].upper()
            curr_connections = connections[i]
            num_h_to_add = 0

            # Simple valency rules for neutral state
            if element == 'C':
                num_h_to_add = 4 - len(curr_connections)
                # Check for double bonds
                for neighbor_idx in curr_connections:
                    bond = next((b for b in bonds if (b['from'] == i and b['to'] == neighbor_idx) or (b['from'] == neighbor_idx and b['to'] == i)), None)
                    if bond and bond['order'] == 2:
                        num_h_to_add -= 1
            elif element == 'N':
                # For amino group, neutral is NH2
                # In proline it's NH in the ring
                num_h_to_add = 3 - len(curr_connections)
            elif element == 'O':
                # Carboxyl O is either =O or -OH
                # We need to distinguish based on bond order
                is_double = False
                for neighbor_idx in curr_connections:
                    bond = next((b for b in bonds if (b['from'] == i and b['to'] == neighbor_idx) or (b['from'] == neighbor_idx and b['to'] == i)), None)
                    if bond and bond['order'] == 2:
                        is_double = True
                        break
                if not is_double:
                    num_h_to_add = 2 - len(curr_connections)
            elif element == 'S' or element == 'SE':
                num_h_to_add = 2 - len(curr_connections)

            if num_h_to_add > 0:
                # Add hydrogens
                for _ in range(num_h_to_add):
                    # For simplicity in this script, we place them in somewhat reasonable positions
                    # In a real app we'd use a better geometry solver, but here we can just offset
                    # based on existing neighbors or default directions.

                    h_pos = {'x': atom['x'], 'y': atom['y'], 'z': atom['z']}
                    length = bond_lengths.get(element, 1.0)

                    if not curr_connections:
                        # Should not happen for amino acid atoms except maybe isolated ones
                        h_pos['x'] += length
                    elif len(curr_connections) == 1:
                        # Extend away from the neighbor
                        neighbor = atoms[curr_connections[0]]
                        dx = atom['x'] - neighbor['x']
                        dy = atom['y'] - neighbor['y']
                        dz = atom['z'] - neighbor['z']
                        mag = math.sqrt(dx*dx + dy*dy + dz*dz)
                        if mag == 0: dx = 1; mag = 1

                        # Add some variation if adding multiple H to same atom
                        offset_x = 0; offset_y = 0; offset_z = 0
                        if _ == 1: offset_y = 0.5; offset_z = 0.5
                        if _ == 2: offset_y = -0.5; offset_z = 0.5

                        h_pos['x'] += (dx/mag) * length + offset_x
                        h_pos['y'] += (dy/mag) * length + offset_y
                        h_pos['z'] += (dz/mag) * length + offset_z
                    elif len(curr_connections) == 2:
                        # Place in the plane of the two neighbors
                        n1 = atoms[curr_connections[0]]
                        n2 = atoms[curr_connections[1]]
                        v1 = (n1['x'] - atom['x'], n1['y'] - atom['y'], n1['z'] - atom['z'])
                        v2 = (n2['x'] - atom['x'], n2['y'] - atom['y'], n2['z'] - atom['z'])
                        # Vector bisecting the angle, then negate it
                        v_bisect = (-(v1[0] + v2[0]), -(v1[1] + v2[1]), -(v1[2] + v2[2]))
                        mag = math.sqrt(v_bisect[0]**2 + v_bisect[1]**2 + v_bisect[2]**2)
                        if mag == 0: v_bisect = (0, 0, 1); mag = 1
                        h_pos['x'] += (v_bisect[0]/mag) * length
                        h_pos['y'] += (v_bisect[1]/mag) * length
                        h_pos['z'] += (v_bisect[2]/mag) * length
                    elif len(curr_connections) == 3:
                        # Tetrahedral-ish
                        n1 = atoms[curr_connections[0]]
                        n2 = atoms[curr_connections[1]]
                        n3 = atoms[curr_connections[2]]
                        v1 = (n1['x'] - atom['x'], n1['y'] - atom['y'], n1['z'] - atom['z'])
                        v2 = (n2['x'] - atom['x'], n2['y'] - atom['y'], n2['z'] - atom['z'])
                        v3 = (n3['x'] - atom['x'], n3['y'] - atom['y'], n3['z'] - atom['z'])
                        v_sum = (-(v1[0] + v2[0] + v3[0]), -(v1[1] + v2[1] + v3[1]), -(v1[2] + v2[2] + v3[2]))
                        mag = math.sqrt(v_sum[0]**2 + v_sum[1]**2 + v_sum[2]**2)
                        if mag == 0: v_sum = (0, 0, 1); mag = 1
                        h_pos['x'] += (v_sum[0]/mag) * length
                        h_pos['y'] += (v_sum[1]/mag) * length
                        h_pos['z'] += (v_sum[2]/mag) * length

                    h_idx = len(new_atoms)
                    new_atoms.append({'element': 'H', 'x': round(h_pos['x'], 2), 'y': round(h_pos['y'], 2), 'z': round(h_pos['z'], 2)})
                    new_bonds.append({'from': i, 'to': h_idx, 'order': 1})

        aa['atoms'] = new_atoms
        aa['bonds'] = new_bonds

if __name__ == "__main__":
    with open('src/data/amino-acids.json', 'r') as f:
        data = json.load(f)

    add_hydrogens(data)

    with open('src/data/amino-acids.json', 'w') as f:
        json.dump(data, f, indent=2)
