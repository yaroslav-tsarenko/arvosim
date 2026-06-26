import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
          background: 'linear-gradient(135deg, #10B981, #059669)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', position: 'relative' }}>
          <span style={{ fontSize: 100, fontWeight: 700, color: 'white', lineHeight: 1 }}>
            A
          </span>
          <div
            style={{
              position: 'absolute',
              right: -30,
              top: -10,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: '3px solid #5EEAD4',
                borderLeft: '3px solid transparent',
                borderBottom: '3px solid transparent',
                opacity: 0.5,
              }}
            />
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: '3px solid #5EEAD4',
                borderLeft: '3px solid transparent',
                borderBottom: '3px solid transparent',
                opacity: 0.7,
                marginLeft: -4,
                marginTop: -18,
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
