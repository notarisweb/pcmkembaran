'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<any[]>([])
  const [isGuest, setIsGuest] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [replyTo, setReplyTo] = useState<any>(null)
  const [formData, setFormData] = useState({ name: '', email: '', website: '', content: '' })
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  // 1. Ambil data komentar
  const fetchComments = useCallback(async () => {
    if (!supabase || !slug) return
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_slug', slug)
      .eq('is_approved', true)
      .order('created_at', { ascending: true })
    
    if (!error && data) setComments(data)
  }, [slug])

  // 2. Monitor Auth & Real-time dengan Auto-Scroll
  useEffect(() => {
    if (!slug || !supabase) return
    fetchComments()

    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) setUser(session.user)
    }
    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user)
        setIsGuest(false)
        
        // MANUVER: Jika baru saja login (SIGNED_IN), paksa scroll ke form
        if (event === 'SIGNED_IN') {
          if (typeof window !== 'undefined') {
            // Bersihkan URL dari query params tanpa reload
            window.history.replaceState(null, '', window.location.pathname)
            
            // Berikan jeda 0.5 detik agar DOM siap, lalu scroll halus
            setTimeout(() => {
              formRef.current?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }, 500);
          }
        }
      } else {
        setUser(null)
      }
    })

    const channel = supabase.channel(`comments-realtime-${slug}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `article_slug=eq.${slug}` }, 
        () => fetchComments()
      ).subscribe()

    return () => {
      subscription.unsubscribe()
      supabase.removeChannel(channel)
    }
  }, [slug, fetchComments])

  // 3. Kirim Komentar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.content.trim()) return
    setLoading(true)

    const displayName = user ? (user.user_metadata?.full_name || user.user_metadata?.name || user.email) : formData.name
    const displayAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null

    const commentData = {
      article_slug: slug,
      content: formData.content,
      name: displayName,
      email: user ? user.email : formData.email,
      avatar_url: displayAvatar,
      user_id: user?.id || null,
      is_guest: !user,
      is_approved: true,
      parent_id: replyTo ? replyTo.id : null
    }

    try {
      const { error } = await supabase.from('comments').insert([commentData])
      if (error) throw error
      setFormData({ ...formData, content: '' })
      setReplyTo(null)
      fetchComments()
    } catch (err: any) {
      alert("Gagal kirim: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // 4. Login Google dengan Anchor Link #komentar
  const handleGoogleLogin = async () => {
    if (!supabase) return
    
    // Pasang jangkar #komentar di redirect URL
    const redirectUrl = `${window.location.origin}/auth/callback?next=${window.location.pathname}#komentar`
    
    await supabase.auth.signInWithOAuth({ 
      provider: 'google', 
      options: { 
        redirectTo: redirectUrl,
        queryParams: { access_type: 'offline', prompt: 'consent' }
      } 
    })
  }

  /**
   * KOMPONEN AVATAR TACTICAL (Anti-Error / Fail-Safe)
   */
  const Avatar = ({ name, url, size = "md" }: { name: string, url?: string, size?: "sm" | "md" }) => {
    const [imgError, setImgError] = useState(false)
    
    useEffect(() => {
      setImgError(false)
    }, [url])

    const dim = size === "sm" ? "w-8 h-8 text-[10px]" : "w-11 h-11 text-lg";
    const rounded = "rounded-2xl shadow-sm overflow-hidden shrink-0";
    
    if (url && !imgError) {
      return (
        <img 
          src={url} 
          className={`${dim} ${rounded} object-cover`} 
          alt={name} 
          referrerPolicy="no-referrer" 
          onError={() => setImgError(true)}
        />
      )
    }

    return (
      <div className={`${dim} ${rounded} bg-gradient-to-br from-[#ffc107] to-[#ffd54f] flex items-center justify-center font-black text-[#004a8e] uppercase`}>
        {name ? name.charAt(0) : '?'}
      </div>
    )
  }

  return (
    <section id="komentar" className="mt-16 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm scroll-mt-24">
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-[#004a8e]">Diskusi Jamaah</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{comments.length} Tanggapan</p>
        </div>
        {user && (
          <button onClick={() => supabase.auth.signOut()} className="px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all">Logout</button>
        )}
      </div>

      {/* TITIK TARGET: formRef dipasang di sini */}
      <div ref={formRef} className="mb-14 scroll-mt-32">
        {!user && !isGuest ? (
          <div className="flex flex-col items-center p-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-bold mb-6 italic text-sm text-center">Silakan masuk untuk berdiskusi.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={handleGoogleLogin} className="bg-white border-2 border-slate-100 p-4 px-8 rounded-2xl shadow-sm font-black text-xs flex items-center gap-3 hover:scale-105 transition-all uppercase">
                <img src="https://www.google.com/favicon.ico" width={18} alt="Google" /> Masuk Google
              </button>
              <button onClick={() => setIsGuest(true)} className="p-4 px-8 text-xs font-black text-[#004a8e] bg-[#ffc107] rounded-2xl hover:scale-105 transition-all uppercase shadow-md">Komen Tamu</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in zoom-in duration-500">
            {replyTo && (
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                <p className="text-xs font-bold text-yellow-800">Membalas: <span className="italic">@{replyTo.name}</span></p>
                <button type="button" onClick={() => setReplyTo(null)} className="text-[10px] font-black text-red-500 uppercase">Batal</button>
              </div>
            )}
            
            <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
              <Avatar 
                name={user ? (user.user_metadata?.full_name || user.email) : "Tamu"} 
                url={user?.user_metadata?.avatar_url || user?.user_metadata?.picture} 
                size="sm" 
              />
              <p className="text-xs font-bold text-[#004a8e]">
                {user ? `Aktif: ${user.user_metadata?.full_name || user.email}` : "Mode Tamu"}
              </p>
            </div>

            {!user && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Nama Lengkap*" className="p-5 bg-slate-50 rounded-2xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-[#ffc107]" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Email*" className="p-5 bg-slate-50 rounded-2xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-[#ffc107]" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            )}

            <textarea required value={formData.content} placeholder="Tuliskan aspirasi Anda..." className="w-full p-6 h-40 bg-slate-50 rounded-[1.5rem] ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-[#004a8e] resize-none" onChange={e => setFormData({...formData, content: e.target.value})} />
            
            <div className="flex justify-end">
              <button disabled={loading} className="bg-[#004a8e] text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] hover:bg-[#ffc107] hover:text-[#004a8e] transition-all shadow-xl active:scale-95">
                {loading ? 'Mengirim...' : 'Kirim Komentar ➔'}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-10">
        {comments.filter(c => !c.parent_id).map((mainComment) => (
          <div key={mainComment.id}>
            <div className="flex gap-5 p-6 rounded-[2rem] hover:bg-slate-50/80 transition-all border-b border-slate-50">
              <Avatar name={mainComment.name} url={mainComment.avatar_url} />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-black text-sm text-[#004a8e]">{mainComment.name}</span>
                  <span className="text-[10px] font-bold text-slate-300 italic">
                    {new Date(mainComment.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-slate-600 text-[15px] leading-relaxed">{mainComment.content}</p>
                <button onClick={() => { setReplyTo(mainComment); formRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[10px] font-black text-[#004a8e] hover:text-[#ffc107] uppercase pt-2 flex items-center gap-1">
                   ↩ Balas
                </button>
              </div>
            </div>

            <div className="ml-12 md:ml-20 mt-5 space-y-5 border-l-2 border-slate-100 pl-6">
              {comments.filter(reply => reply.parent_id === mainComment.id).map(reply => (
                <div key={reply.id} className="flex gap-4 p-5 bg-slate-50/50 rounded-2xl">
                  <Avatar name={reply.name} url={reply.avatar_url} size="sm" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs text-[#004a8e]">{reply.name}</span>
                      <span className="text-[9px] font-bold text-slate-300">
                        {new Date(reply.created_at).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}