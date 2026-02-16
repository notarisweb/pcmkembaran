// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const subscription = await request.json();
  
  // LOGIKA: Simpan objek 'subscription' ini ke Database.
  // Objek ini yang nantinya dipakai oleh app/api/push/route.ts untuk kirim notif.
  console.log("Subscription diterima:", subscription);

  return NextResponse.json({ success: true });
}