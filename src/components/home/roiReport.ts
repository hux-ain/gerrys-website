// Builds the branded PDF report in the browser. Same content as the WordPress version.
// jsPDF is loaded only when a visitor clicks "Download", so it does not slow the page down.

type Lead = { name: string; email: string; phone: string; city: string; area: string }
type Result = { seats: number; total: number; cloudLevel: string }

const companyNameFromEmail = (email: string) => {
  const domain = (email.split('@')[1] || '').split('.')[0] || 'Your Company'
  return domain.charAt(0).toUpperCase() + domain.slice(1)
}

export async function buildReport(lead: Lead, result: Result, companyEmail: string, companySite: string) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const margin = 48
  let y = 60
  const gold: [number, number, number] = [240, 169, 59]
  const dark: [number, number, number] = [20, 20, 20]
  const grey: [number, number, number] = [110, 110, 110]

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...dark)
  doc.text("GERRY'S INFORMATION TECHNOLOGY (GIT)", margin, y)
  y += 20
  doc.setFontSize(11)
  doc.setTextColor(...gold)
  doc.text('CUSTOM ENTERPRISE INFRASTRUCTURE REPORT', margin, y)
  y += 26
  doc.setDrawColor(220, 220, 220)
  doc.line(margin, y, pageW - margin, y)
  y += 20

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(...dark)
  const dateStr = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
  doc.text(`Prepared For: ${companyNameFromEmail(lead.email)}`, margin, y)
  y += 16
  doc.text(`Date: ${dateStr}`, margin, y)
  y += 16
  doc.text(`Target Scale: ${result.seats} Active Seats | ${result.cloudLevel} Cloud Utilization`, margin, y)
  y += 24

  const sectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...dark)
    doc.text(title, margin, y)
    y += 16
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...grey)
  }
  const bodyLine = (text: string, extraGap = 8) => {
    const lines = doc.splitTextToSize(text, pageW - margin * 2)
    doc.text(lines, margin, y)
    y += lines.length * 13 + extraGap
  }

  sectionHeader('1. BANDWIDTH ARCHITECTURE RECOMMENDATION')
  doc.setTextColor(...dark)
  bodyLine(`Recommended Bandwidth: ${result.total} Mbps Dedicated Internet Access (DIA)`)
  doc.setTextColor(...grey)
  bodyLine('Backup Link: 50 Mbps Failover Link (1:1 Active-Passive)')
  bodyLine('Key Feature: Managed 24/7 Network Operations Center (NOC) monitoring with a guaranteed 99.99% Uptime SLA to eliminate business disruption.', 16)

  sectionHeader("2. HARDWARE & ROUTING BLUEPRINT (Gerry's IT + H3C Alliance)")
  bodyLine(`To sustain a ${result.seats}-user workload without local network bottlenecks, standard consumer routers will fail. We recommend the following enterprise stack:`)
  bodyLine('• Core Router: H3C MSR810 Series Enterprise Router — handles high-throughput NAT, stateful firewalling, and secure VPN tunnels for hybrid employees.')
  bodyLine('• Core Switch: H3C UniServer / S5130 Series (Gigabit Ethernet) — ensures zero local latency for internal data transfers and smooth Power-over-Ethernet (PoE) for corporate IP phones.', 16)

  sectionHeader('3. THE FINANCIAL ROI SUMMARY (Estimated 3-Year TCO)')
  bodyLine("By bundling your infrastructure, hardware, and bandwidth under Gerry's IT vs. sourcing from fragmented vendors:")
  bodyLine('• Hardware Capex Reduction (Direct OEM pricing via H3C/Lenovo): ~20% Savings')
  bodyLine('• Operational Overhead (Single Point of Contact Contract): ~15% Efficiency Gain', 16)

  doc.setDrawColor(20, 20, 20)
  doc.setLineWidth(1)
  doc.rect(margin, y, pageW - margin * 2, 70)
  y += 18
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...dark)
  doc.text('NEXT STEP: BOOK A TECHNICAL AUDIT', margin + 12, y)
  y += 16
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(...grey)
  const audit = doc.splitTextToSize(
    "Ready to validate these metrics? Reply directly to this report to schedule a complimentary, physical site survey and network health check with a Gerry's IT Senior Network Architect.",
    pageW - margin * 2 - 24,
  )
  doc.text(audit, margin + 12, y)
  y += audit.length * 12 + 6
  doc.setTextColor(...gold)
  doc.textWithLink(`${companyEmail}  |  ${companySite}`, margin + 12, y, {
    url: `mailto:${companyEmail}?subject=Technical Audit Request - ${result.total}Mbps - ${result.seats} seats`,
  })

  doc.save('Gerrys-IT-Infrastructure-Report.pdf')
}
