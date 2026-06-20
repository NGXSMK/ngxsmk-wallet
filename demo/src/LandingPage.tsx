import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Wallet, Lock, Shield, Key, Fingerprint, FileText, Smartphone,
  Scan, Eye, Download, Github, Twitter, Globe, ChevronRight,
  CheckCircle, Sparkles, Zap, Server,
  RefreshCw, Clock, Monitor, Layers, Quote,
  Menu, X, ChevronDown, Sun, Moon, Users,
} from "lucide-react";

const features = [
  { icon: Lock, title: "Military-Grade Encryption", desc: "AES-256-GCM with Argon2id key derivation. Your data is encrypted before it ever touches disk.", color: "from-blue-500 to-cyan-500" },
  { icon: Fingerprint, title: "Biometric Unlock", desc: "Windows Hello, Touch ID, and face recognition. Unlock your vault in an instant.", color: "from-purple-500 to-pink-500" },
  { icon: Key, title: "Password Manager", desc: "Store, generate, and autofill strong passwords. Password health scoring and breach alerts included.", color: "from-emerald-500 to-teal-500" },
  { icon: Globe, title: "FIDO2 Passkeys", desc: "Native WebAuthn passkey management. Store and organize passkeys alongside your passwords.", color: "from-orange-500 to-red-500" },
  { icon: FileText, title: "Secure Documents", desc: "Encrypted file storage for passports, IDs, and sensitive documents. Versioned and searchable.", color: "from-rose-500 to-pink-500" },
  { icon: Smartphone, title: "TOTP Authenticator", desc: "Built-in 2FA code generator. No more reaching for your phone — everything in one place.", color: "from-violet-500 to-purple-500" },
  { icon: Scan, title: "Secret Scanner", desc: "Proactively scan your filesystem for exposed API keys, tokens, and credentials.", color: "from-amber-500 to-orange-500" },
  { icon: Shield, title: "Security Dashboard", desc: "Real-time vault health scoring with actionable recommendations to improve your security posture.", color: "from-green-500 to-emerald-500" },
  { icon: Server, title: "Zero-Knowledge Cloud Sync", desc: "Sync encrypted vaults via Google Drive, Dropbox, or OneDrive. We never see your data.", color: "from-sky-500 to-blue-500" },
  { icon: RefreshCw, title: "Backup & Recovery", desc: "Automated encrypted backups with Shamir's Secret Sharing. Never lose access to your data.", color: "from-indigo-500 to-violet-500" },
  { icon: Eye, title: "Local Secret Scanner", desc: "Detect accidentally exposed credentials in environment variables and local files.", color: "from-teal-500 to-green-500" },
  { icon: Layers, title: "Organized Vaults", desc: "Nested folders, favorites, tags, and categories. Global search with Ctrl+K command palette.", color: "from-cyan-500 to-sky-500" },
];

const stats = [
  { value: "99.9%", label: "Uptime", icon: Server },
  { value: "256-bit", label: "Encryption", icon: Lock },
  { value: "12", label: "Item Categories", icon: Layers },
  { value: "30s", label: "Clipboard Clear", icon: Clock },
];

const steps = [
  { number: "01", title: "Download & Install", desc: "Get NGXSMK Wallet for Windows, macOS, or Linux. No account sign-up required." },
  { number: "02", title: "Create Your Vault", desc: "Set a master password and save your recovery key. Your encryption keys are generated locally." },
  { number: "03", title: "Secure Your Life", desc: "Add passwords, documents, identities, and more. Everything stays encrypted on your device." },
];

const testimonials = [
  { quote: "Finally, a password manager that respects privacy. No cloud, no tracking, just solid encryption.", author: "Alex K.", role: "Security Engineer" },
  { quote: "The built-in TOTP and passkey support means I've replaced 3 separate apps with one.", author: "Sarah M.", role: "DevOps Lead" },
  { quote: "The secret scanner caught API keys I didn't even know were exposed. Essential tool.", author: "James R.", role: "Software Developer" },
];

const openSourceFeatures = [
  { icon: Github, title: "Open Source (MIT)", desc: "Fully open source under the MIT license. Audit, fork, and contribute on GitHub.", color: "from-gray-500 to-gray-600" },
  { icon: Users, title: "Community Driven", desc: "Built in the open with contributions from developers worldwide. Your voice shapes the roadmap.", color: "from-blue-500 to-cyan-500" },
  { icon: Shield, title: "No Hidden Costs", desc: "Every feature is free. No premium tiers, no subscriptions, no data selling — ever.", color: "from-emerald-500 to-teal-500" },
];

function Navbar({ dark, onToggleDark, onLaunchDemo }: { dark: boolean; onToggleDark: () => void; onLaunchDemo: () => void }) {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 60], ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]);
  const border = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]);

  return (
    <motion.nav style={{ background: bg, borderColor: border }} className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors">
      <div className="mx-auto max-w-7xl flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25 flex items-center justify-center">
            <Wallet className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
          </div>
          <span className="text-lg font-bold tracking-tight">NGXSMK <span className="text-primary">Wallet</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Security", "Open Source", "FAQ"].map(s => {
            const href = s === "Open Source" ? "#opensource" : `#${s.toLowerCase()}`;
            return <a key={s} href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">{s}</a>;
          })}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onToggleDark} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={onLaunchDemo} className="hidden sm:inline-flex h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all items-center gap-1.5">
            Live Demo <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl p-4 space-y-3">
          {["Features", "Security", "Open Source", "FAQ"].map(s => {
            const href = s === "Open Source" ? "#opensource" : `#${s.toLowerCase()}`;
            return <a key={s} href={href} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground font-medium py-2">{s}</a>;
          })}
          <button onClick={onLaunchDemo} className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">Live Demo</button>
        </motion.div>
      )}
    </motion.nav>
  );
}

function SectionHeader({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight"><span className="text-gradient">{title}</span></h2>
      {subtitle && <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }}
      className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] rounded-2xl transition-opacity duration-300`} />
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 flex items-center justify-center mb-4 shadow-lg`} style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--primary) 15%, transparent), transparent)` }}>
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
    </motion.div>
  );
}

function LandingPage({ dark, onToggleDark, onLaunchDemo }: { dark: boolean; onToggleDark: () => void; onLaunchDemo: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar dark={dark} onToggleDark={onToggleDark} onLaunchDemo={onLaunchDemo} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Privacy-first, fully offline
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Your Digital Identity.{'\n'}<span className="text-gradient">Your Control.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
              The zero-knowledge, offline-first vault for passwords, passkeys, documents, and identities.
              Encrypted locally. Never uploaded. Always yours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onLaunchDemo}
                className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-xl shadow-primary/25 transition-all flex items-center gap-2 text-base">
                <Zap className="w-5 h-5" /> Launch Live Demo
              </motion.button>
              <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href="#features"
                className="h-12 px-8 rounded-xl border border-border bg-background font-medium hover:bg-accent transition-all flex items-center gap-2 text-base">
                Explore Features <ChevronDown className="w-4 h-4" />
              </motion.a>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> No Account Needed</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Open Source</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Zero Telemetry</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="text-center">
                <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>;
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader title="Everything You Need" subtitle="Passwords, passkeys, documents, 2FA, and more — all secured by military-grade encryption." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader title="Get Started in Minutes" subtitle="No accounts, no sign-ups, no data collection. Just download and go." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                <div className="text-5xl sm:text-6xl font-black text-primary/10 leading-none mb-4">{s.number}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && <div className="hidden md:block absolute top-6 left-16 w-full h-px bg-gradient-to-r from-primary/20 to-transparent" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader title="Built for Security" subtitle="Every layer of NGXSMK Wallet is designed with privacy and security as the foundation." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Lock, title: "AES-256-GCM Encryption", desc: "All vault data is encrypted at rest using AES-256-GCM. Your master password is the only key — we never store or transmit it." },
              { icon: Key, title: "Argon2id Key Derivation", desc: "Memory-hard key derivation function resists GPU and ASIC brute-force attacks. Configurable parameters for future-proofing." },
              { icon: Shield, title: "Zero-Knowledge Architecture", desc: "Encryption keys are derived from your master password at runtime and never persisted. We literally cannot access your data." },
              { icon: Eye, title: "Anti-Tampering Protection", desc: "DevTools detection, clipboard auto-clear, session timeouts, and screen lock on focus loss prevent unauthorized access." },
              { icon: RefreshCw, title: "Secure Memory Management", desc: "Cryptographic material is zeroed out from memory upon lock, exit, or timeout. No traces left behind." },
              { icon: Monitor, title: "Offline-First Design", desc: "No cloud dependency means no attack surface. Your vault works fully offline with optional encrypted sync." },
            ].map((s, i) => {
              const Icon = s.icon;
              return <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-card/50">
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0"><Icon className="w-5 h-5 text-primary" /></div>
                <div><h3 className="text-sm font-semibold mb-1">{s.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p></div>
              </motion.div>;
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader title="Trusted by Developers" subtitle="Built by engineers, for engineers." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-border/50 bg-card/50">
                <Quote className="w-6 h-6 text-primary/30 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border/50"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-white">{t.author[0]}</div><div><p className="text-sm font-medium">{t.author}</p><p className="text-xs text-muted-foreground">{t.role}</p></div></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section id="opensource" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader title="Free &amp; Open Source" subtitle="No subscriptions. No hidden costs. No data collection. Just secure, private software for everyone." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {openSourceFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br p-2.5 flex items-center justify-center mx-auto mb-4" style={{ backgroundImage: `linear-gradient(to bottom right, var(--primary), var(--primary))` }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-primary/[0.05] to-primary/[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Start Securing Your Digital Life</h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-8">Free, open source, and private. Download NGXSMK Wallet and take control of your digital identity.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onLaunchDemo}
                className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-xl shadow-primary/25 transition-all flex items-center gap-2 text-base">
                <Zap className="w-5 h-5" /> Launch Live Demo
              </motion.button>
              <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href="#features"
                className="h-12 px-8 rounded-xl border border-border bg-background font-medium hover:bg-accent transition-all flex items-center gap-2 text-base">
                <Download className="w-4 h-4" /> Download App
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-lg flex items-center justify-center"><Wallet className="w-4 h-4 text-white" /></div><span className="text-sm font-bold">NGXSMK Wallet</span></div>
              <p className="text-xs text-muted-foreground leading-relaxed">Privacy-first, fully local digital identity and secrets management. Built with Rust and React.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Security", "FAQ"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Changelog", "Status"] },
              { title: "Community", links: ["GitHub", "Discussions", "Contributing", "Code of Conduct"] },
            ].map(s => (
              <div key={s.title}><h4 className="text-sm font-semibold mb-3">{s.title}</h4><ul className="space-y-2">{s.links.map(l => <li key={l}><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>)}</ul></div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border/50 gap-4">
            <p className="text-xs text-muted-foreground">© 2026 NGXSMK. All rights reserved. Frontend licensed under MIT.</p>
            <div className="flex items-center gap-4">
              {[Github, Twitter, Globe].map((Icon, i) => (
                <a key={i} href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Icon className="w-4 h-4" /></a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { LandingPage };
