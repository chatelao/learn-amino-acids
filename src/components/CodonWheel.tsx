import React from 'react';
import { ccp, AminoAcid, AminoAcidClass } from '../services/ccp';

interface CodonWheelProps {
  selectedAA: AminoAcid;
}

const BASES = ['G', 'A', 'C', 'U'] as const;

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

const describeArc = (x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) => {
  const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
  const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
  const startInner = polarToCartesian(x, y, innerRadius, endAngle);
  const endInner = polarToCartesian(x, y, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M", startOuter.x, startOuter.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
    "L", endInner.x, endInner.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
    "Z"
  ].join(" ");

  return d;
};

const CodonWheel: React.FC<CodonWheelProps> = ({ selectedAA }) => {
  const size = 600;
  const center = size / 2;

  const getColorForClass = (aaClass: AminoAcidClass | 'Stop') => {
    switch (aaClass) {
      case 'Nonpolar': return '#fff9c4';
      case 'Polar': return '#c8e6c9';
      case 'Basic': return '#bbdefb';
      case 'Acidic': return '#ffcdd2';
      case 'Stop': return '#eeeeee';
      default: return '#ffffff';
    }
  };

  const getAminoAcidForCodon = (codon: string) => {
    const results = ccp.getAminoAcidsByCodon(codon);
    if (results.length === 0) return { name: 'Stop', class: 'Stop' as const, code3: 'Stop' };
    const selectedMatch = results.find(aa => aa.code3 === selectedAA.code3);
    return selectedMatch || results[0];
  };

  const rings = [
    { inner: 30, outer: 80 },   // 2nd Base
    { inner: 80, outer: 140 },  // 1st Base
    { inner: 140, outer: 250 }  // 3rd Base + Amino Acid
  ];

  return (
    <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center' }}>
      <h3 style={{ marginTop: 0 }}>Genetic Code Wheel ("Inside-Out" 2nd-1st-3rd)</h3>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={center} cy={center} r={30} fill="#fff" stroke="#ccc" />

        {/* Ring 1: 2nd Base */}
        {BASES.map((b2, i) => {
          const startAngle = i * 90;
          const endAngle = (i + 1) * 90;
          const midAngle = startAngle + 45;
          const labelPos = polarToCartesian(center, center, (rings[0].inner + rings[0].outer) / 2, midAngle);

          return (
            <g key={`b2-${b2}`}>
              <path
                d={describeArc(center, center, rings[0].inner, rings[0].outer, startAngle, endAngle)}
                fill="#f5f5f5"
                stroke="#ccc"
                strokeWidth="1"
              />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontWeight: 'bold', fontSize: '1.2rem' }}
              >
                {b2}
              </text>
            </g>
          );
        })}

        {/* Ring 2: 1st Base */}
        {BASES.map((b2, i2) =>
          BASES.map((b1, i1) => {
            const startAngle = i2 * 90 + i1 * 22.5;
            const endAngle = i2 * 90 + (i1 + 1) * 22.5;
            const midAngle = startAngle + 11.25;
            const labelPos = polarToCartesian(center, center, (rings[1].inner + rings[1].outer) / 2, midAngle);

            return (
              <g key={`b2-${b2}-b1-${b1}`}>
                <path
                  d={describeArc(center, center, rings[1].inner, rings[1].outer, startAngle, endAngle)}
                  fill="#fafafa"
                  stroke="#ccc"
                  strokeWidth="1"
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '0.9rem' }}
                >
                  {b1}
                </text>
              </g>
            );
          })
        )}

        {/* Ring 3: 3rd Base & Amino Acid */}
        {BASES.map((b2, i2) =>
          BASES.map((b1, i1) =>
            BASES.map((b3, i3) => {
              const codon = `${b1}${b2}${b3}`;
              const aa = getAminoAcidForCodon(codon);
              const startAngle = i2 * 90 + i1 * 22.5 + i3 * 5.625;
              const endAngle = i2 * 90 + i1 * 22.5 + (i3 + 1) * 5.625;
              const midAngle = startAngle + 2.8125;
              const isSelected = selectedAA.codons.includes(codon);

              const baseLabelPos = polarToCartesian(center, center, rings[2].inner + 15, midAngle);
              const aaLabelPos = polarToCartesian(center, center, rings[2].outer - 40, midAngle);

              return (
                <g key={codon}>
                  <path
                    d={describeArc(center, center, rings[2].inner, rings[2].outer, startAngle, endAngle)}
                    fill={getColorForClass(aa.class as any)}
                    stroke={isSelected ? "#000" : "#ccc"}
                    strokeWidth={isSelected ? "2" : "0.5"}
                    style={{ cursor: 'help' }}
                  >
                    <title>{codon}: {aa.name}</title>
                  </path>
                  <text
                    x={baseLabelPos.x}
                    y={baseLabelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: '0.6rem', pointerEvents: 'none' }}
                  >
                    {b3}
                  </text>
                  <text
                    x={aaLabelPos.x}
                    y={aaLabelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle}, ${aaLabelPos.x}, ${aaLabelPos.y})`}
                    style={{ fontSize: '0.65rem', fontWeight: isSelected ? 'bold' : 'normal', pointerEvents: 'none' }}
                  >
                    {aa.code3}
                  </text>
                </g>
              );
            })
          )
        )}

        {/* Ring labels */}
        <text x={center} y={center - 10} textAnchor="middle" style={{ fontSize: '0.6rem', fill: '#888' }}>2nd</text>
        <text x={center} y={center + 15} textAnchor="middle" style={{ fontSize: '0.6rem', fill: '#888' }}>Base</text>
      </svg>

      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#fff9c4', border: '1px solid #ccc' }}></div> Nonpolar
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#c8e6c9', border: '1px solid #ccc' }}></div> Polar
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#ffcdd2', border: '1px solid #ccc' }}></div> Acidic
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#bbdefb', border: '1px solid #ccc' }}></div> Basic
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#eeeeee', border: '1px solid #ccc' }}></div> Stop
        </div>
      </div>
    </div>
  );
};

export default CodonWheel;
