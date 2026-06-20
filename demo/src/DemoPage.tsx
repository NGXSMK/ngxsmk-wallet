import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  Key,
  Fingerprint,
  FileText,
  Shield,
  Scan,
  Settings,
  Lock,
  Search,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Smartphone,
  Receipt,
  Eye,
  EyeOff,
  Copy,
  Check,
  Plus,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Download,
  Moon,
  Sun,
  Monitor,
  Bell,
} from "lucide-react";

const navSections = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "vault", icon: Wallet, label: "Vault" },
      { id: "passwords", icon: Key, label: "Passwords" },
      { id: "passkeys", icon: Fingerprint, label: "Passkeys" },
      { id: "documents", icon: FileText, label: "Documents" },
      { id: "identity", icon: UserCircle, label: "Identity" },
      { id: "expenses", icon: Receipt, label: "Expenses" },
    ],
  },
  {
    label: "Tools",
    items: [
      { id: "mfa", icon: Smartphone, label: "2FA" },
      { id: "scanner", icon: Scan, label: "Scanner" },
      { id: "security", icon: Shield, label: "Security" },
    ],
  },
  {
    label: null,
    items: [
      { id: "settings", icon: Settings, label: "Settings" },
    ],
  },
];

const mockPasswords = [
  { id: 1, site: "github.com", username: "dev@ngxsmk.com", password: "G@thub!23Pass", category: "Dev", strength: 85, lastUsed: "2 min ago" },
  { id: 2, site: "google.com", username: "user@gmail.com", password: "G00gle$ecure1", category: "Google", strength: 72, lastUsed: "1 hour ago" },
  { id: 3, site: "aws.amazon.com", username: "admin@ngxsmk.com", password: "AWS#Str0ng!99", category: "Dev", strength: 95, lastUsed: "3 hours ago" },
  { id: 4, site: "stackoverflow.com", username: "dev@ngxsmk.com", password: "St@ck0v3rfl0w", category: "Dev", strength: 68, lastUsed: "Yesterday" },
  { id: 5, site: "reddit.com", username: "ngxsmk_user", password: "R3dd!tUs3r123", category: "Social", strength: 60, lastUsed: "2 days ago" },
];

const mockPasskeys = [
  { id: 1, name: "Personal Laptop", rpId: "windows.hello.com", created: "Jan 15, 2026", lastUsed: "Today" },
  { id: 2, name: "Work Laptop", rpId: "windows.hello.com", created: "Feb 20, 2026", lastUsed: "Yesterday" },
  { id: 3, name: "Android Phone", rpId: "google.com", created: "Mar 5, 2026", lastUsed: "3 days ago" },
];

const mockDocuments = [
  { id: 1, name: "Passport_Scan.pdf", type: "PDF", size: "2.4 MB", encrypted: true, updated: "Jan 10, 2026" },
  { id: 2, name: "ID_Card_Front.png", type: "Image", size: "1.1 MB", encrypted: true, updated: "Jan 10, 2026" },
  { id: 3, name: "Tax_Returns_2025.pdf", type: "PDF", size: "4.7 MB", encrypted: true, updated: "Mar 22, 2026" },
  { id: 4, name: "SSH_Key_Ed25519", type: "Key", size: "1.2 KB", encrypted: true, updated: "Apr 1, 2026" },
];

const mockExpenses = [
  { id: 1, merchant: "AWS Hosting", amount: -45.23, category: "Dev", date: "Today", status: "pending" },
  { id: 2, merchant: "GitHub Copilot", amount: -10.00, category: "Dev", date: "Yesterday", status: "cleared" },
  { id: 3, merchant: "Domain Renewal", amount: -14.99, category: "Infra", date: "Apr 15", status: "cleared" },
  { id: 4, merchant: "Freelance Payment", amount: 1200.00, category: "Income", date: "Apr 14", status: "cleared" },
  { id: 5, merchant: "DigitalOcean", amount: -24.00, category: "Dev", date: "Apr 12", status: "cleared" },
];

const mockTotpCodes = [
  { id: 1, issuer: "GitHub", account: "dev@ngxsmk.com", code: "482 391", remaining: 42 },
  { id: 2, issuer: "Google", account: "user@gmail.com", code: "730 184", remaining: 18 },
  { id: 3, issuer: "Microsoft", account: "admin@ngxsmk.com", code: "215 607", remaining: 55 },
  { id: 4, issuer: "AWS", account: "admin@ngxsmk.com", code: "893 462", remaining: 34 },
];

const mockIdentityRecords = [
  { id: 1, type: "Passport", country: "United States", number: "P12345678", expiry: "Dec 2028", status: "valid" },
  { id: 2, type: "Driver's License", country: "United States", number: "DL-42-1234567", expiry: "Jun 2027", status: "valid" },
  { id: 3, type: "National ID", country: "United States", number: "XXX-XX-1234", expiry: "N/A", status: "valid" },
];

const securityFindings = [
  { id: 1, severity: "high", title: "Weak password detected", detail: "reddit.com password is weak", action: "Change password" },
  { id: 2, severity: "medium", title: "Password reused", detail: "3 passwords use similar patterns", action: "Rotate passwords" },
  { id: 3, severity: "low", title: "Aging password", detail: "aws.amazon.com password is 180+ days old", action: "Review" },
];

const recentScans = [
  { id: 1, path: "~/Documents/config/", secrets: 0, status: "clean", date: "Today" },
  { id: 2, path: "~/.ssh/", secrets: 0, status: "clean", date: "Today" },
  { id: 3, path: "~/Projects/api-keys.env", secrets: 2, status: "warning", date: "Apr 16" },
];

const vaultItems = [
  { id: 1, name: "Personal", icon: Lock, count: 12, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 2, name: "Work", icon: Lock, count: 8, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: 3, name: "Shared", icon: Lock, count: 4, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: 4, name: "Archive", icon: Lock, count: 3, color: "text-amber-500", bg: "bg-amber-500/10" },
];

function Badge({ children, variant = "default", className = "" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "info" | "destructive" | "secondary" | "outline"; className?: string }) {
  const colors = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border text-foreground",
    destructive: "bg-red-500/10 text-red-500",
    success: "bg-green-500/10 text-green-500",
    warning: "bg-yellow-500/10 text-yellow-500",
    info: "bg-blue-500/10 text-blue-500",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[variant]} ${className}`}>{children}</span>;
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight"><span className="text-gradient">{title}</span></h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function DemoApp({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [settings, setSettings] = useState<{ notifications: boolean; autoLock: boolean; theme: "light" | "dark" | "system"; compact: boolean }>({ notifications: true, autoLock: true, theme: "system", compact: false });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleCopy = async (id: number, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePassword = (id: number) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardPage />;
      case "vault": return <VaultPage />;
      case "passwords": return <PasswordsPage />;
      case "passkeys": return <PasskeysPage />;
      case "documents": return <DocumentsPage />;
      case "identity": return <IdentityPage />;
      case "expenses": return <ExpensesPage />;
      case "mfa": return <MfaPage />;
      case "scanner": return <ScannerPage />;
      case "security": return <SecurityPage />;
      case "settings": return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  function DashboardPage() {
    const stats = [
      { label: "Passwords", icon: Key, value: mockPasswords.length, color: "text-blue-500", bg: "bg-blue-500/10", page: "passwords" },
      { label: "Passkeys", icon: Fingerprint, value: mockPasskeys.length, color: "text-purple-500", bg: "bg-purple-500/10", page: "passkeys" },
      { label: "Documents", icon: FileText, value: mockDocuments.length, color: "text-emerald-500", bg: "bg-emerald-500/10", page: "documents" },
      { label: "Security Score", icon: Shield, value: "82%", color: "text-amber-500", bg: "bg-amber-500/10", page: "security" },
    ];
    const quickLinks = [
      { label: "New Password", page: "passwords", icon: Key, color: "from-blue-500 to-blue-600" },
      { label: "Add Passkey", page: "passkeys", icon: Fingerprint, color: "from-purple-500 to-purple-600" },
      { label: "New Document", page: "documents", icon: FileText, color: "from-emerald-500 to-emerald-600" },
      { label: "Security Report", page: "security", icon: Shield, color: "from-amber-500 to-amber-600" },
    ];
    return (
      <div className="space-y-8 max-w-6xl">
        <PageHeader title="Dashboard" subtitle="Welcome to your secure vault" action={
          <Badge variant="success" className="gap-1.5 px-3 py-1.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Vault Active
          </Badge>
        } />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                onClick={() => setActivePage(stat.page)} className="cursor-pointer group">
                <div className="rounded-xl border bg-card/60 p-5 h-full group-hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${stat.bg}`}><Icon className={`w-5 h-5 ${stat.color}`} /></div>
                  </div>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.button key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.02 }}
                onClick={() => setActivePage(link.page)} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity`} />
                <div className="relative rounded-xl border bg-card/60 p-5 flex flex-col items-center text-center gap-3 group-hover:-translate-y-0.5 transition-all">
                  <div className="p-3 rounded-xl bg-primary/5"><Icon className="w-6 h-6 text-primary" /></div>
                  <span className="text-sm font-medium">{link.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
        <div className="rounded-xl border bg-card/60">
          <div className="p-6 pb-2"><h3 className="text-sm font-medium flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Recent Activity</h3></div>
          <div className="p-6 pt-2 space-y-1">
            {[
              { action: "Unlocked vault containing 5 password records", time: "Just now" },
              { action: "New passkey registered: Personal Laptop", time: "Today" },
              { action: "Security scan completed — no issues found", time: "2 hours ago" },
              { action: "Password rotated: github.com", time: "Yesterday" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2.5 px-3 rounded-lg hover:bg-muted/30 transition-colors">
                <span>{a.action}</span>
                <span className="text-muted-foreground text-xs">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function PasswordsPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Passwords" subtitle={`${mockPasswords.length} stored credentials`} action={
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25"><Plus className="w-4 h-4" /> Add Password</button>
        } />
        <div className="space-y-2">
          {mockPasswords.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="rounded-xl border bg-card/60 p-4 flex items-center gap-4 group hover:border-primary/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{p.site}</p>
                <p className="text-xs text-muted-foreground truncate">{p.username}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden md:block"><Badge variant={p.strength >= 80 ? "success" : p.strength >= 60 ? "warning" : "destructive"}>{p.strength}%</Badge></div>
                <button onClick={() => togglePassword(p.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword[p.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => handleCopy(p.id, p.password)} className="text-muted-foreground hover:text-foreground transition-colors">
                  {copiedId === p.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <span className="text-xs text-muted-foreground hidden sm:block">{p.lastUsed}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  function PasskeysPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Passkeys" subtitle="FIDO2/WebAuthn credentials" action={
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25"><Plus className="w-4 h-4" /> Register Passkey</button>
        } />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPasskeys.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card/60 p-5 space-y-3 hover:border-primary/20 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center"><Fingerprint className="w-5 h-5 text-purple-500" /></div>
                  <div><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.rpId}</p></div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground border-t border-border/50 pt-3">
                <span>Created: {p.created}</span>
                <span>Last: {p.lastUsed}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  function VaultPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Vaults" subtitle="Your encrypted vaults" action={
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25"><Plus className="w-4 h-4" /> New Vault</button>
        } />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vaultItems.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border bg-card/60 p-5 flex items-center gap-4 cursor-pointer hover:border-primary/20 group hover:-translate-y-0.5 transition-all">
                <div className={`p-3 rounded-xl ${v.bg}`}><Icon className={`w-6 h-6 ${v.color}`} /></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.count} items</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </motion.div>
            );
          })}
        </div>
        <div className="rounded-xl border bg-card/60 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Globe className="w-5 h-5 text-blue-500" /></div>
            <div><p className="text-sm font-medium">Cloud Sync</p><p className="text-xs text-muted-foreground">Sync your vaults via Google Drive, Dropbox, or OneDrive</p></div>
          </div>
          <div className="flex gap-2">
            {["Google Drive", "Dropbox", "OneDrive"].map((s) => (
              <button key={s} className="flex-1 h-9 rounded-lg border border-border bg-background text-xs font-medium hover:bg-accent transition-colors">{s}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function DocumentsPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Documents" subtitle="Encrypted file storage" action={
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25"><Download className="w-4 h-4" /> Upload</button>
        } />
        <div className="space-y-2">
          {mockDocuments.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card/60 p-4 flex items-center gap-4 group hover:border-primary/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-emerald-500" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.type} · {d.size}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success" className="gap-1"><Lock className="w-3 h-3" /> Encrypted</Badge>
                <span className="text-xs text-muted-foreground hidden sm:block">{d.updated}</span>
                <button className="text-muted-foreground hover:text-foreground transition-colors"><Download className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  function IdentityPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Identity" subtitle="Digital identity records" action={
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25"><Plus className="w-4 h-4" /> Add Record</button>
        } />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockIdentityRecords.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center"><UserCircle className="w-5 h-5 text-cyan-500" /></div>
                  <div><p className="text-sm font-medium">{r.type}</p><p className="text-xs text-muted-foreground">{r.country}</p></div>
                </div>
                <Badge variant={r.status === "valid" ? "success" : "warning"}>{r.status}</Badge>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground border-t border-border/50 pt-3">
                <span>#{r.number}</span>
                <span>Exp: {r.expiry}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  function MfaPage() {
    const [codes] = useState(mockTotpCodes.map(c => ({ ...c, remaining: Math.floor(Math.random() * 60) })));
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Two-Factor Auth" subtitle="TOTP authenticator codes" action={
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25"><Plus className="w-4 h-4" /> Add Account</button>
        } />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {codes.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><Smartphone className="w-5 h-5 text-orange-500" /></div>
                  <div><p className="text-sm font-medium">{c.issuer}</p><p className="text-xs text-muted-foreground">{c.account}</p></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono font-bold tracking-widest text-primary">{c.code}</span>
                <button onClick={() => handleCopy(c.id, c.code.replace(" ", ""))} className="text-muted-foreground hover:text-foreground transition-colors">
                  {copiedId === c.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground"><span>Code expires</span><span>{c.remaining}s</span></div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${(c.remaining / 60) * 100}%` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  function ExpensesPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Expenses" subtitle="Transaction & expense tracking" action={
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25"><Plus className="w-4 h-4" /> Add Transaction</button>
        } />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Spent", value: "$94.22", color: "text-red-500", bg: "bg-red-500/10" },
            { label: "Income", value: "$1,200.00", color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Categories", value: "3", color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Pending", value: "1", color: "text-amber-500", bg: "bg-amber-500/10" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border bg-card/60 p-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {mockExpenses.map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="rounded-xl border bg-card/60 p-4 flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${e.amount < 0 ? "bg-red-500" : "bg-green-500"}`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{e.merchant}</p>
                <p className="text-xs text-muted-foreground">{e.category} · {e.date}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${e.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                  {e.amount < 0 ? "-" : "+"}${Math.abs(e.amount).toFixed(2)}
                </p>
                <Badge variant={e.status === "cleared" ? "success" : "warning"}>{e.status === "cleared" ? "Cleared" : "Pending"}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  function SecurityPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Security" subtitle="Vault health & breach monitoring" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border bg-card/60 p-6 text-center col-span-1">
            <p className="text-4xl font-bold text-amber-500">82</p>
            <p className="text-xs text-muted-foreground mt-1">Security Score</p>
            <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-amber-500" style={{ width: "82%" }} />
            </div>
          </div>
          <div className="rounded-xl border bg-card/60 p-6 flex items-center justify-between col-span-2">
            {[
              { label: "Encrypted", icon: Lock, color: "text-green-500" },
              { label: "2FA Active", icon: Smartphone, color: "text-green-500" },
              { label: "No Breaches", icon: Shield, color: "text-green-500" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="p-2.5 rounded-xl bg-green-500/10"><s.icon className={`w-5 h-5 ${s.color}`} /></div>
                <span className="text-xs font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Security Findings</h3>
          <div className="space-y-2">
            {securityFindings.map((f) => (
              <div key={f.id} className="rounded-xl border bg-card/60 p-4 flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${f.severity === "high" ? "bg-red-500/10" : f.severity === "medium" ? "bg-amber-500/10" : "bg-blue-500/10"}`}>
                  {f.severity === "high" ? <XCircle className="w-4 h-4 text-red-500" /> : f.severity === "medium" ? <AlertTriangle className="w-4 h-4 text-amber-500" /> : <Info className="w-4 h-4 text-blue-500" />}
                </div>
                <div className="flex-1"><p className="text-sm font-medium">{f.title}</p><p className="text-xs text-muted-foreground">{f.detail}</p></div>
                <button className="text-xs font-medium text-primary hover:underline">{f.action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function ScannerPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Secret Scanner" subtitle="Detect exposed credentials in your filesystem" action={
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25"><Scan className="w-4 h-4" /> New Scan</button>
        } />
        <div className="rounded-xl border bg-card/60 p-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"><Scan className="w-7 h-7 text-primary" /></div>
          <p className="text-sm font-medium">Local Secret Scanner</p>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">Scan your local filesystem and directories to find accidentally exposed API keys, tokens, or credentials.</p>
        </div>
        <div className="space-y-2">
          {recentScans.map((s) => (
            <div key={s.id} className="rounded-xl border bg-card/60 p-4 flex items-center gap-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.status === "clean" ? "bg-green-500/10" : "bg-amber-500/10"}`}>
                {s.status === "clean" ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
              </div>
              <div className="flex-1"><p className="text-sm font-medium truncate">{s.path}</p><p className="text-xs text-muted-foreground">{s.secrets > 0 ? `${s.secrets} secrets found` : "No secrets detected"} · {s.date}</p></div>
              <Badge variant={s.status === "clean" ? "success" : "warning"}>{s.status === "clean" ? "Clean" : `${s.secrets} issues`}</Badge>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function SettingsPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Settings" subtitle="Application preferences" />
        <div className="space-y-4">
          {[
            { icon: Bell, label: "Notifications", desc: "Receive security alerts and updates", value: settings.notifications, onChange: (v: boolean) => setSettings(s => ({ ...s, notifications: v })) },
            { icon: Lock, label: "Auto-Lock", desc: "Lock vault after inactivity", value: settings.autoLock, onChange: (v: boolean) => setSettings(s => ({ ...s, autoLock: v })) },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border bg-card/60 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted"><s.icon className="w-4 h-4 text-muted-foreground" /></div>
                <div><p className="text-sm font-medium">{s.label}</p><p className="text-xs text-muted-foreground">{s.desc}</p></div>
              </div>
              <button onClick={() => s.onChange(!s.value)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors ${s.value ? "bg-primary" : "bg-input"}`}>
                <span className={`block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${s.value ? "translate-x-4" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-xl border bg-card/60 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted"><Monitor className="w-4 h-4 text-muted-foreground" /></div>
              <div><p className="text-sm font-medium">Theme</p><p className="text-xs text-muted-foreground">Display appearance</p></div>
            </div>
            <div className="flex gap-1">
              {(["light", "dark", "system"] as const).map((t) => (
                <button key={t} onClick={() => {
                  if (t === "dark") onToggleDark();
                  setSettings(s => ({ ...s, theme: t }));
                }}
                  className={`p-1.5 rounded-lg transition-colors ${settings.theme === t ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                  {t === "light" ? <Sun className="w-4 h-4" /> : t === "dark" ? <Moon className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/3 via-transparent to-blue-500/3 pointer-events-none" />
      <aside className={`fixed left-0 top-0 h-full z-30 flex flex-col border-r border-border/50 bg-background/80 backdrop-blur-xl transition-[width] duration-300 ${sidebarCollapsed ? "w-16" : "w-60"}`}>
        <div className="flex items-center h-14 px-3 border-b border-border/50">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20 flex items-center justify-center shrink-0"><Wallet className="w-4 h-4 text-primary-foreground" /></div>
              <span className="text-sm font-semibold tracking-tight">NGXSMK</span>
            </div>
          ) : (
            <div className="mx-auto"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20 flex items-center justify-center"><Wallet className="w-4 h-4 text-primary-foreground" /></div></div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-1.5 space-y-5 scrollbar-thin">
          {navSections.map((section) => (
            <div key={section.label ?? "bottom"}>
              {section.label && !sidebarCollapsed && (
                <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/30 select-none">{section.label}</p>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button key={item.id} onClick={() => setActivePage(item.id)}
                    onMouseEnter={() => setHoveredItem(item.label)} onMouseLeave={() => setHoveredItem(null)}
                    className={`relative flex items-center gap-3 w-full px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${sidebarCollapsed ? "justify-center px-0" : ""} ${isActive ? "bg-primary/15 text-primary font-semibold" : "text-muted-foreground/50 hover:text-foreground hover:bg-accent/40"}`}>
                    {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-primary" />}
                    <Icon className="w-5 h-5 shrink-0" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                    {sidebarCollapsed && hoveredItem === item.label && (
                      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 px-2.5 py-1.5 rounded-lg bg-popover border text-xs font-medium text-popover-foreground shadow-lg whitespace-nowrap pointer-events-none">{item.label}</div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="border-t border-border/50 p-1.5 space-y-0.5">
          <button onClick={() => setActivePage("search")}
            className={`relative flex items-center gap-3 w-full px-2.5 py-2 rounded-xl text-sm font-medium transition-all text-muted-foreground/50 hover:text-foreground hover:bg-accent/40 ${sidebarCollapsed ? "justify-center px-0" : ""}`}>
            <Search className="w-5 h-5 shrink-0" />
            {!sidebarCollapsed && <span className="flex-1 text-left">Search</span>}
            {!sidebarCollapsed && <kbd className="hidden md:inline-flex items-center gap-1 rounded-md border border-border/40 bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/70"><span>⌘</span>K</kbd>}
          </button>
          <button
            className={`relative flex items-center gap-3 w-full px-2.5 py-2 rounded-xl text-sm font-medium transition-all text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 ${sidebarCollapsed ? "justify-center px-0" : ""}`}>
            <Lock className="w-5 h-5 shrink-0" />
            {!sidebarCollapsed && <span>Lock Vault</span>}
          </button>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`relative flex items-center gap-3 w-full px-2.5 py-2 rounded-xl text-sm font-medium transition-all text-muted-foreground/40 hover:text-foreground hover:bg-accent/40 ${sidebarCollapsed ? "justify-center px-0" : ""}`}>
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <><ChevronLeft className="w-5 h-5 shrink-0" /><span>Collapse</span></>}
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto transition-[margin] duration-300 relative" style={{ marginLeft: sidebarCollapsed ? 64 : 240 }}>
        <header className="sticky top-0 z-20 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-end h-14 px-6 gap-3">
            <Badge variant="info" className="gap-1.5 px-3 py-1.5 rounded-lg"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Demo Mode</Badge>
            <button onClick={onToggleDark} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-border/50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-white">D</div>
              <span className="text-sm font-medium hidden sm:block">Demo User</span>
            </div>
          </div>
        </header>
        <div className="p-8 pb-10">
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
