import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { inr } from "../data/billing";
import { notoSansBase64 } from "./notoSans";
const ORANGE = [249, 115, 22];
const DARK = [26, 26, 26];
const MUTED = [120, 120, 120];

const titles = {
  order: "Tax Invoice",
  payout: "Payout Statement",
  subscription: "Subscription Invoice",
};

// rupee glyph isn't in jsPDF's core fonts — use "Rs." in the PDF
const pdfAmt = (n) => (n < 0 ? `- ${inr(-n)}` : inr(n));
export function generateInvoicePdf(inv, bill) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const M = 40;
  const W = doc.internal.pageSize.getWidth();

  // Header
  doc
    .setFont("helvetica", "bold")
    .setFontSize(22)
    .setTextColor(...ORANGE);
  doc.text("ZINGRO", M, 50);
  doc
    .setFont("helvetica", "normal")
    .setFontSize(9)
    .setTextColor(...MUTED);
  doc.text("Kiran Kumar K", M, 66);
  doc.text("WeWork Latitude, Bengaluru, Karnataka", M, 78);

  doc
    .setFont("helvetica", "bold")
    .setFontSize(13)
    .setTextColor(...DARK);
  doc.text(titles[inv.type], W - M, 50, { align: "right" });
  doc
    .setFont("helvetica", "normal")
    .setFontSize(9)
    .setTextColor(...MUTED);
  doc.text(inv.number, W - M, 66, { align: "right" });
  doc.text(inv.date, W - M, 78, { align: "right" });

  doc.addFileToVFS("NotoSans.ttf", notoSansBase64);
  doc.addFont("NotoSans.ttf", "NotoSans", "normal");
  doc.setFont("NotoSans");
  // Bill-to
  let y = 110;
  doc.setDrawColor(230).line(M, y, W - M, y);
  y += 18;
  doc
    .setFont("helvetica", "bold")
    .setFontSize(10)
    .setTextColor(...DARK);
  doc.text(inv.customer || inv.cook, M, y);
  doc
    .setFont("helvetica", "normal")
    .setFontSize(9)
    .setTextColor(...MUTED);
  if (inv.gstin) {
    y += 13;
    doc.text(`GSTIN: ${inv.gstin}`, M, y);
  }
  if (inv.state) {
    y += 13;
    doc.text(`Place of supply: ${inv.state}`, M, y);
  }

  // Line items + tax rows
  const body = [
    ...bill.lines.map((l) => [l.label, pdfAmt(l.amt)]),
    [
      { content: "Subtotal", styles: { fontStyle: "bold" } },
      { content: pdfAmt(bill.subtotal), styles: { fontStyle: "bold" } },
    ],
    ...bill.taxes.map((t) => [t.label, pdfAmt(t.amt)]),
  ];

  autoTable(doc, {
    startY: y + 18,
    head: [["Description", "Amount"]],
    body,
    foot: [
      [inv.type === "payout" ? "Net Payout" : "Total", pdfAmt(bill.total)],
    ],
    theme: "plain",
    headStyles: {
      fillColor: ORANGE,
      textColor: 255,
      fontStyle: "bold",
      halign: "left",
    },
    columnStyles: { 1: { halign: "right" } },
    footStyles: {
      fillColor: [250, 247, 242],
      textColor: ORANGE,
      fontStyle: "bold",
      fontSize: 12,
    },
    styles: { fontSize: 10, cellPadding: 6, textColor: DARK },
    margin: { left: M, right: M },
  });

  let fy = doc.lastAutoTable.finalY + 24;
  if (bill.payoutNote) {
    doc
      .setFont("helvetica", "normal")
      .setFontSize(9)
      .setTextColor(...MUTED);
    doc.text(bill.payoutNote, M, fy);
    fy += 16;
  }
  doc.setFontSize(8).setTextColor(180);
  doc.text("This is a computer-generated invoice.", W / 2, fy + 8, {
    align: "center",
  });

  doc.save(`${inv.number.replace(/\//g, "-")}.pdf`);
}
