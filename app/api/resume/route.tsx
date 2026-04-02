import { NextResponse } from 'next/server'
import React from 'react'
import {
  Document, Page, Text, View, Image, Font,
  renderToBuffer, StyleSheet,
} from '@react-pdf/renderer'
import QRCode from 'qrcode'
import {
  CONTACT, SUMMARY, SKILLS, TOOLS, AI_TOOLS,
  TIMELINE, EDUCATION, CERTIFICATIONS_PRIMARY,
} from '@/data/resume'

/* ------------------------------------------------------------------ */
/*  Font registration                                                  */
/* ------------------------------------------------------------------ */

// Use Helvetica (built-in) as primary font for PDF — no font loading needed.
// @react-pdf/renderer has built-in Helvetica which is clean and ATS-friendly.

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const C = {
  ink:       '#1C1917',
  secondary: '#3D3A36',
  muted:     '#7A746C',
  border:    '#D6D0C8',
  accent:    '#5A5550',
  white:     '#FFFFFF',
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: C.ink,
    backgroundColor: C.white,
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 44,
  },

  /* Header */
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    
    color: C.secondary,
    marginBottom: 6,
  },
  contactRow: {
    fontSize: 9,
    color: C.muted,
    marginBottom: 16,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
    marginBottom: 16,
  },

  /* Sections */
  sectionHeader: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.2,
    color: C.accent,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 14,
  },

  /* Experience */
  jobRole: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 1,
  },
  jobMeta: {
    fontSize: 9,
    color: C.muted,
    marginBottom: 4,
  },
  jobDescription: {
    fontSize: 10,
    
    color: C.secondary,
    lineHeight: 1.5,
    marginBottom: 10,
  },

  /* Skills */
  skillCategory: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  skillItems: {
    fontSize: 9,
    
    color: C.secondary,
    lineHeight: 1.5,
    marginBottom: 6,
  },

  /* Tools */
  toolsList: {
    fontSize: 9,
    
    color: C.secondary,
    lineHeight: 1.5,
    marginBottom: 4,
  },

  /* Education */
  eduTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 1,
  },
  eduInstitution: {
    fontSize: 9,
    color: C.muted,
    marginBottom: 6,
  },

  /* QR footer */
  qrContainer: {
    position: 'absolute',
    bottom: 36,
    right: 44,
    alignItems: 'center',
  },
  qrImage: {
    width: 56,
    height: 56,
    marginBottom: 3,
  },
  qrCaption: {
    fontSize: 7,
    color: C.muted,
  },
})

/* ------------------------------------------------------------------ */
/*  PDF Document                                                       */
/* ------------------------------------------------------------------ */

function ResumeDocument({ qrDataUrl }: { qrDataUrl: string }) {
  return (
    <Document>
      <Page size="LETTER" style={s.page}>

        {/* ── Header ── */}
        <Text style={s.name}>{CONTACT.name}</Text>
        <Text style={s.title}>{CONTACT.title}</Text>
        <Text style={s.contactRow}>
          {CONTACT.phone}  ·  {CONTACT.email}  ·  {CONTACT.linkedin}  ·  {CONTACT.portfolio}
        </Text>
        <View style={s.divider} />

        {/* ── Summary ── */}
        <Text style={s.jobDescription}>{SUMMARY}</Text>

        {/* ── Experience ── */}
        <Text style={s.sectionHeader}>Experience</Text>
        {TIMELINE.map((job) => (
          <View key={job.company} wrap={false}>
            <Text style={s.jobRole}>{job.role}</Text>
            <Text style={s.jobMeta}>{job.company}  ·  {job.period}</Text>
            <Text style={s.jobDescription}>
              {job.paragraphs.join(' ')}
            </Text>
          </View>
        ))}

        {/* ── Skills ── */}
        <Text style={s.sectionHeader}>Skills</Text>
        {SKILLS.map((skill) => (
          <View key={skill.category}>
            <Text style={s.skillCategory}>{skill.category}</Text>
            <Text style={s.skillItems}>{skill.items}</Text>
          </View>
        ))}

        {/* ── Tools ── */}
        <Text style={s.sectionHeader}>Tools</Text>
        <Text style={s.toolsList}>{[...TOOLS].join(', ')}</Text>
        <Text style={{ ...s.toolsList, marginBottom: 0 }}>
          AI: {[...AI_TOOLS].join(', ')}
        </Text>

        {/* ── Education & Certifications ── */}
        <Text style={s.sectionHeader}>Education</Text>
        {EDUCATION.map((ed) => (
          <View key={ed.label}>
            <Text style={s.eduTitle}>{ed.label}</Text>
            <Text style={s.eduInstitution}>{ed.institution}</Text>
          </View>
        ))}
        {CERTIFICATIONS_PRIMARY.map((cert) => (
          <View key={cert.title}>
            <Text style={s.eduTitle}>{cert.title}</Text>
            <Text style={s.eduInstitution}>{cert.institution}</Text>
          </View>
        ))}

        {/* ── QR Code ── */}
        <View style={s.qrContainer}>
          <Image style={s.qrImage} src={qrDataUrl} />
          <Text style={s.qrCaption}>{CONTACT.portfolio}</Text>
        </View>

      </Page>
    </Document>
  )
}

/* ------------------------------------------------------------------ */
/*  API Route                                                          */
/* ------------------------------------------------------------------ */

export async function GET(): Promise<NextResponse> {
  try {
    const qrDataUrl = await QRCode.toDataURL(`https://${CONTACT.portfolio}`, {
      width: 200,
      margin: 0,
      color: { dark: C.ink, light: C.white },
    })

    const buffer = await renderToBuffer(
      <ResumeDocument qrDataUrl={qrDataUrl} />
    )
    const bytes = new Uint8Array(buffer)

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Jay-Shock-Resume.pdf"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Resume PDF generation failed:', error)
    return NextResponse.json(
      { error: 'PDF generation failed', detail: String(error) },
      { status: 500 },
    )
  }
}
