import { ImageResponse } from 'next/og'

export const alt = 'Jay Shock — Product Designer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const LOGO_SVG_BASE64 =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjQuNjMgNzMuNyI+CiAgPHBhdGggZmlsbD0iI0YyRjJGMiIgZD0iTTE4MS44NSw1LjYybC00LjU1LDExLjQzYzQuNjQsMi42Nyw4LjEsNi41NiwxMC4wNSwxMS4xOC42OCwxLjYsMS4xOCwzLjI5LDEuNDYsNS4wNS4yMywxLjI4LjM0LDIuNi4zNCwzLjk1LDAsMTIuMjUtOS40NCwyMS44LTIzLjg1LDIzLjE1bC0xMC4wNSwxMS41OGMyLjE0LjI4LDQuMy40MSw2LjQ0LjQxLDIwLjI2LDAsNDIuMDUtMTEuNzIsNDIuMDUtMzUuMTQsMC0xNS4zMS05LjU1LTI2LjA5LTIxLjg5LTMxLjYxWiIvPgogIDxwYXRoIGZpbGw9IiNGMkYyRjIiIGQ9Ik0xMzUuMzcsNDQuNzNjLS40LTEuMDktLjcxLTIuMjEtLjkyLTMuMzctLjI3LTEuMzQtLjQtMi43Mi0uNC00LjEzLDAtMTMuMDcsMTAuMjktMjMuMzYsMjUuOTUtMjQuMDVsMTAuMDktMTEuMTJjLTIuNzktLjQ5LTUuNjEtLjczLTguNC0uNzMtMjAuNDQsMC00Mi4yMywxMS40Mi00Mi4yMywzNS43MSwwLDE2LjI1LDEwLjY2LDI3LjA1LDI0LjA2LDMyLjA2bDQuMzQtMTEuMzdjLTYuMDctMi43Ny0xMC40NC03LjQtMTIuNDktMTNaIi8+CiAgPHBhdGggZmlsbD0iI0YyRjJGMiIgZD0iTTI2Ljc0LDMwLjYyYy0uMjgsMC0uNTYtLjA3LS45Ny0uMDctMy42LS4yMS0xMi41NC0uNzctMTIuNTQtMy45NSwwLTEuOCwyLjM2LTQuNzgsMTIuMzMtNC43OCw2LjM3LDAsMTMuMywxLjY2LDIwLjUsNS4xOWw0LjIyLTguNzljLTguNDQtNC41LTE2LjEzLTYuNTgtMjQuNzItNi41OEMxNi4yMSwxMS42NCwwLDE0LjIsMCwyNy4wMWMwLDEwLjE4LDkuOTgsMTIuODIsMTkuNDYsMTMuOTksMS42Ny4yMSwzLjQuMzUsNC45Mi40OSwyLjk4LjI4LDUuODIuNTUsOC4xNywxLjA0LDMuNC42OSw1LjQ4LDEuOCw1LjQ4LDMuNjcsMCwzLjg4LTcuNTUsNS42MS0xMy45Myw1LjYxLTQuNTcsMC0xMC4xOC0yLjA0LTE5LjM5LTYuMUwuMjgsNTUuMTNjOS42Myw0Ljk5LDE1LjUxLDYuOTMsMjQuNzksNi45MywxMC4wNSwwLDI2LjM5LTIuOTgsMjYuMzktMTUuODZzLTE0Ljg5LTE0LjgyLTI0LjcyLTE1LjU4WiIvPgogIDxwb2x5Z29uIGZpbGw9IiNGMkYyRjIiIHBvaW50cz0iOTYuMjggMzIuNjIgNzIuNjYgMzIuNjIgNzIuNjYgMTIuODggNTguNjcgMTIuODggNTguNjcgNjEuNDQgNzIuNTkgNjEuNDQgNzIuNTkgNDMuMDggOTYuMjggNDMuMDggOTYuMjggNjEuNDQgMTEwLjI3IDYxLjQ0IDExMC4yNyAxMi44OCA5Ni4yOCAxMi44OCA5Ni4yOCAzMi42MiIvPgogIDxwYXRoIGZpbGw9IiNGMkYyRjIiIGQ9Ik0yNDAuMDYsNTEuOTVjLTguMzgsMC0xNS43Mi01Ljg5LTE1LjcyLTE0LjgyczcuMjctMTQuNjksMTUuNzktMTQuNjksMTMuMDksMy4xMiwxOC43Nyw3LjE0bDQuMy05Ljc3Yy01Ljc1LTQuMTYtMTIuMjYtNy44My0yMy40MS03LjgzLTE0LjA2LDAtMjguOTUsOS41Ni0yOC45NSwyNS4wMSwwLDE2LjU1LDE2LjIsMjUuMDcsMjkuMTUsMjUuMDdzMTkuODgtNC44NSwyNC4zMS04LjQ1bC4wNy0uNDktNS4yNi04LjQ1Yy01LjYxLDQuMDItMTAuOTQsNy4yOC0xOS4wNSw3LjI4WiIvPgogIDxwYXRoIGZpbGw9IiNGMkYyRjIiIGQ9Ik0zMDEuNzgsMzIuMzVsMjIuMjMtMTkuNDdoLTE1Ljc5Yy03LjIxLDYuMS0xNC40OCwxMi40LTIxLjY4LDE4LjU3VjEyLjg4aC0xMy44NWwtLjA3LDQ4LjU2aDEzLjkydi0xNS45M2MyLjA4LTEuNjcsNC4wMi0zLjQsNi4wMy01LjEzbDE1Ljc5LDIxLjA2aDE2LjI3bC0yMi44NS0yOS4wOVoiLz4KICA8cG9seWdvbiBmaWxsPSIjRjJGMkYyIiBwb2ludHM9IjE2Ni4xNiAzMS41NCAxNzguNyAwIDE0Mi4wOCA0MC4zOSAxNTkuMTQgNDIuMTUgMTQ3LjEzIDczLjcgMTgyLjU2IDMyLjg2IDE2Ni4xNiAzMS41NCIvPgo8L3N2Zz4K'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#161616',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Logo — top left */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_SVG_BASE64}
          alt=""
          width={120}
          height={27}
          style={{
            position: 'absolute',
            top: '60px',
            left: '80px',
            opacity: 0.4,
          }}
        />

        {/* Name — centered, large, bold */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#F2F2F2',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            textAlign: 'center',
          }}
        >
          Jay Shock
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 300,
            color: '#737373',
            marginTop: '16px',
            letterSpacing: '0.05em',
            textAlign: 'center',
          }}
        >
          Product Designer
        </div>

        {/* URL — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            fontSize: 16,
            fontWeight: 300,
            color: '#525252',
            letterSpacing: '0.08em',
          }}
        >
          jayshock.com
        </div>
      </div>
    ),
    { ...size }
  )
}
