import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Wallet, Key, Fingerprint, FileText, Shield, Scan,
  Settings, Lock, Search, ChevronLeft, ChevronRight, UserCircle,
  Smartphone, Receipt,   Eye, EyeOff, Copy, Check, Plus, Globe,
  Clock, AlertTriangle, CheckCircle, Info, Download,
  Star, ExternalLink, Moon, Sun, Monitor, Code, Terminal,
  Database, Award, RefreshCw, Package, Music, Home,
  Briefcase, TrendingUp, ShoppingBag, Car, GraduationCap,
  HeartPulse, UtensilsCrossed, MoreHorizontal, Calendar,
  AlertOctagon, AlertCircle, Pencil, Trash2, Camera, ScanFace,
  File, Image, FileSpreadsheet, ArrowLeft, LogIn,
  UserPlus, ShieldCheck, Zap, Sparkles,
} from "lucide-react";

type PageId = "dashboard" | "vault" | "passwords" | "passkeys" | "documents" | "identity" | "expenses" | "mfa" | "scanner" | "security" | "settings" | "welcome" | "unlock" | "onboarding";

const navSections = [
  {
    label: "Overview",
    items: [
      { id: "dashboard" as PageId, icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "vault" as PageId, icon: Wallet, label: "Vault" },
      { id: "passwords" as PageId, icon: Key, label: "Passwords" },
      { id: "passkeys" as PageId, icon: Fingerprint, label: "Passkeys" },
      { id: "documents" as PageId, icon: FileText, label: "Documents" },
      { id: "identity" as PageId, icon: UserCircle, label: "Identity" },
      { id: "expenses" as PageId, icon: Receipt, label: "Expenses" },
    ],
  },
  {
    label: "Tools",
    items: [
      { id: "mfa" as PageId, icon: Smartphone, label: "2FA" },
      { id: "scanner" as PageId, icon: Scan, label: "Scanner" },
      { id: "security" as PageId, icon: Shield, label: "Security" },
    ],
  },
  {
    label: null,
    items: [
      { id: "settings" as PageId, icon: Settings, label: "Settings" },
    ],
  },
];

const CATEGORIES = [
  { id: "password", label: "Passwords", icon: Key },
  { id: "passkey", label: "Passkeys", icon: Fingerprint },
  { id: "note", label: "Secure Notes", icon: FileText },
  { id: "api_key", label: "API Keys", icon: Code },
  { id: "ssh_key", label: "SSH Keys", icon: Terminal },
  { id: "database", label: "Databases", icon: Database },
  { id: "certificate", label: "Certificates", icon: Shield },
  { id: "license", label: "Licenses", icon: Award },
  { id: "recovery_code", label: "Recovery Codes", icon: RefreshCw },
  { id: "env_var", label: "Environment Variables", icon: Monitor },
  { id: "identity", label: "Identities", icon: UserCircle },
  { id: "custom", label: "Custom Items", icon: Package },
];

const mockSecrets = [
  { id: "s1", vault_id: "v1", category: "password", title: "github.com", username: "dev@ngxsmk.com", strength_score: 85, favorite: true, usage_count: 42, url: "https://github.com", updated_at: "2026-06-20T10:00:00Z" },
  { id: "s2", vault_id: "v1", category: "password", title: "google.com", username: "user@gmail.com", strength_score: 72, favorite: false, usage_count: 128, url: "https://google.com", updated_at: "2026-06-19T15:00:00Z" },
  { id: "s3", vault_id: "v1", category: "password", title: "AWS Console", username: "admin@ngxsmk.com", strength_score: 95, favorite: true, usage_count: 67, url: "https://aws.amazon.com", updated_at: "2026-06-18T09:00:00Z" },
  { id: "s4", vault_id: "v1", category: "api_key", title: "OpenAI API", username: "sk-proj-xxxx", strength_score: 100, favorite: true, usage_count: 1203, updated_at: "2026-06-17T12:00:00Z" },
  { id: "s5", vault_id: "v1", category: "note", title: "Wi-Fi Credentials", username: "HomeNetwork", strength_score: null, favorite: false, usage_count: 5, updated_at: "2026-06-15T08:00:00Z" },
  { id: "s6", vault_id: "v1", category: "database", title: "Production DB", username: "admin_prod", strength_score: 90, favorite: true, usage_count: 0, url: "postgresql://prod.example.com:5432/main", updated_at: "2026-06-14T14:00:00Z" },
  { id: "s7", vault_id: "v1", category: "ssh_key", title: "Personal Server", username: "root@vps.ngxsmk.com", strength_score: 100, favorite: false, usage_count: 89, updated_at: "2026-06-13T11:00:00Z" },
  { id: "s8", vault_id: "v1", category: "license", title: "JetBrains IDE", username: "dev@ngxsmk.com", strength_score: null, favorite: false, usage_count: 1, updated_at: "2026-06-12T16:00:00Z" },
];

const mockPasskeys = [
  { id: "pk1", relying_party: "windows.hello.com", device_name: "Personal Laptop", device_type: "platform", backup_eligible: true, backup_state: true, created_at: "2026-01-15T10:00:00Z", last_used_at: "2026-06-20T08:00:00Z" },
  { id: "pk2", relying_party: "google.com", device_name: "Android Phone", device_type: "platform", backup_eligible: true, backup_state: true, created_at: "2026-03-05T14:00:00Z", last_used_at: "2026-06-18T12:00:00Z" },
  { id: "pk3", relying_party: "github.com", device_name: "YubiKey 5C NFC", device_type: "cross-platform", backup_eligible: false, backup_state: false, created_at: "2026-02-20T09:00:00Z", last_used_at: "2026-06-17T16:00:00Z" },
];

const mockDocuments = [
  { id: "d1", title: "Passport Scan", file_name: "passport_scan.pdf", file_size: 2457600, mime_type: "application/pdf", version: 1, created_at: "2026-01-10T10:00:00Z", updated_at: "2026-01-10T10:00:00Z" },
  { id: "d2", title: "ID Card Front", file_name: "id_card_front.png", file_size: 1126400, mime_type: "image/png", version: 1, created_at: "2026-01-10T11:00:00Z", updated_at: "2026-01-10T11:00:00Z" },
  { id: "d3", title: "Tax Returns 2025", file_name: "tax_returns_2025.pdf", file_size: 4812800, mime_type: "application/pdf", version: 2, created_at: "2026-03-22T09:00:00Z", updated_at: "2026-04-01T14:00:00Z" },
  { id: "d4", title: "SSH Key - Ed25519", file_name: "id_ed25519", file_size: 1228, mime_type: "text/plain", version: 1, created_at: "2026-04-01T08:00:00Z", updated_at: "2026-04-01T08:00:00Z" },
];

const mockIdentities = [
  { id: "i1", category: "passport", title: "US Passport", full_name: "John A. Doe", document_number: "P12345678", issuing_country: "United States", issuing_authority: "US Department of State", expiration_date: "2028-12-15", notes: null },
  { id: "i2", category: "drivers_license", title: "Driver's License", full_name: "John A. Doe", document_number: "DL-42-1234567", issuing_country: "United States", issuing_authority: "CA DMV", expiration_date: "2027-06-30", notes: "Class C" },
  { id: "i3", category: "national_id", title: "SSN Card", full_name: "John A. Doe", document_number: "XXX-XX-1234", issuing_country: "United States", issuing_authority: "SSA", expiration_date: null, notes: "Last 4 digits only" },
];

const mockExpenses = [
  { id: "e1", title: "AWS Hosting", amount: -4523, category: "bills", expense_type: "expense" as const, date: "2026-06-20", notes: "EC2 + RDS monthly" },
  { id: "e2", title: "GitHub Copilot", amount: -1000, category: "education", expense_type: "expense" as const, date: "2026-06-19", notes: "Monthly subscription" },
  { id: "e3", title: "Domain Renewal", amount: -1499, category: "bills", expense_type: "expense" as const, date: "2026-04-15", notes: "ngxsmk.com" },
  { id: "e4", title: "Freelance Project", amount: 120000, category: "salary", expense_type: "income" as const, date: "2026-06-14", notes: "Web development consulting" },
  { id: "e5", title: "DigitalOcean", amount: -2400, category: "bills", expense_type: "expense" as const, date: "2026-04-12", notes: "App Platform" },
  { id: "e6", title: "Docker Subscription", amount: -500, category: "education", expense_type: "expense" as const, date: "2026-06-10", notes: "Personal Pro plan" },
];

const mockTotpTokens = [
  { id: "t1", issuer: "GitHub", label: "dev@ngxsmk.com", code: "482391", remaining: 42, period: 30 },
  { id: "t2", issuer: "Google", label: "user@gmail.com", code: "730184", remaining: 18, period: 30 },
  { id: "t3", issuer: "Microsoft", label: "admin@ngxsmk.com", code: "215607", remaining: 55, period: 30 },
  { id: "t4", issuer: "AWS", label: "admin@ngxsmk.com", code: "893462", remaining: 34, period: 30 },
];

const securityReport = {
  score: 82,
  total_items: 8,
  weak_passwords: 1,
  reused_passwords: 2,
  missing_mfa: 3,
  old_credentials: 2,
  unused_accounts: 1,
  breached_accounts: 0,
  recommendations: [
    { severity: "high", title: "Weak password detected", description: "reddit.com password strength score is below 60", action: "Change password" },
    { severity: "medium", title: "Password reuse detected", description: "3 passwords share similar patterns across accounts", action: "Review passwords" },
    { severity: "low", title: "Aging credentials", description: "aws.amazon.com password has not been changed in 180+ days", action: "Rotate password" },
    { severity: "info", title: "Enable two-factor auth", description: "3 accounts support 2FA but are not yet configured", action: "Enable MFA" },
  ],
};

const scannerFindings = [
  { id: "sf1", severity: "high", finding_type: "api_key", description: "Exposed OpenAI API key detected", file_path: "~/Projects/config/.env", line_number: 3, content_preview: "OPENAI_API_KEY=sk-proj-..." },
  { id: "sf2", severity: "medium", finding_type: "password", description: "Hardcoded database password in source code", file_path: "~/Projects/app/config.py", line_number: 42, content_preview: 'DB_PASSWORD = "password123"' },
  { id: "sf3", severity: "low", finding_type: "token", description: "GitHub personal access token found", file_path: "~/.git-credentials", line_number: 1, content_preview: "https://ghp_xxxxxxxxx@github.com" },
];

const EXPENSE_CATEGORY_ICONS: Record<string, typeof UtensilsCrossed> = {
  food: UtensilsCrossed, transport: Car, shopping: ShoppingBag, bills: Receipt,
  entertainment: Music, health: HeartPulse, education: GraduationCap, housing: Home,
  salary: Briefcase, investment: TrendingUp, other: MoreHorizontal,
};

function Badge({ children, variant = "default", className = "" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "info" | "destructive" | "secondary" | "outline"; className?: string }) {
  const colors = { default: "bg-primary text-primary-foreground", secondary: "bg-secondary text-secondary-foreground", outline: "border border-border text-foreground", destructive: "bg-red-500/10 text-red-500", success: "bg-green-500/10 text-green-500", warning: "bg-yellow-500/10 text-yellow-500", info: "bg-blue-500/10 text-blue-500" };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[variant]} ${className}`}>{children}</span>;
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return <div className="flex items-center justify-between mb-8"><div><h1 className="text-3xl font-bold tracking-tight"><span className="text-gradient">{title}</span></h1>{subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}</div>{action}</div>;
}

function StrengthBar({ score }: { score: number | null }) {
  if (score === null) return null;
  const color = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-lime-500" : score >= 40 ? "bg-yellow-500" : "bg-red-500";
  return <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden"><div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} /></div>;
}

function getMimeIcon(mime: string | null) {
  if (!mime) return File;
  if (mime.startsWith("image/")) return Image;
  if (mime.includes("pdf")) return FileText;
  if (mime.includes("spreadsheet") || mime.includes("excel")) return FileSpreadsheet;
  return File;
}

function getIdentityColor(cat: string) {
  const colors: Record<string, string> = { passport: "text-blue-500 bg-blue-500/10", drivers_license: "text-emerald-500 bg-emerald-500/10", national_id: "text-purple-500 bg-purple-500/10", insurance: "text-amber-500 bg-amber-500/10", certificate: "text-rose-500 bg-rose-500/10" };
  return colors[cat] || "text-gray-500 bg-gray-500/10";
}

export function DemoApp({ dark, onToggleDark, onBack }: { dark: boolean; onToggleDark: () => void; onBack?: () => void }) {
  const [activePage, setActivePage] = useState<PageId>("welcome");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [vaultCategory, setVaultCategory] = useState<string>("all");
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [masterPassword, setMasterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoveryKey] = useState(() => Array.from({ length: 32 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join(""));
  const [passwordGenOpen, setPasswordGenOpen] = useState(false);
  const [genPassword, setGenPassword] = useState(() => Array.from({ length: 16 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[Math.floor(Math.random() * 72)]).join(""));

  const isUnlocked = activePage !== "welcome" && activePage !== "unlock" && activePage !== "onboarding";

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSize = (bytes: number) => {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes, i = 0;
    while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
    return `${size.toFixed(1)} ${units[i]}`;
  };

  const formatAmount = (cents: number) => `${cents < 0 ? "-" : "+"}$${(Math.abs(cents) / 100).toFixed(2)}`;

  const renderPage = () => {
    switch (activePage) {
      case "welcome": return <WelcomePage />;
      case "unlock": return <UnlockPage />;
      case "onboarding": return <OnboardingPage />;
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

  function WelcomePage() {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl shadow-primary/30 flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold"><span className="text-gradient">NGXSMK Wallet</span></h1>
            <p className="text-muted-foreground">Your private, offline digital vault</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Lock, label: "Encrypted", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: Shield, label: "Secure", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { icon: Key, label: "Private", color: "text-purple-500", bg: "bg-purple-500/10" },
            ].map((t, i) => {
              const Icon = t.icon;
              return <div key={i} className={`rounded-xl ${t.bg} p-3 text-center`}><Icon className={`w-5 h-5 mx-auto ${t.color}`} /><p className="text-xs font-medium mt-1 text-muted-foreground">{t.label}</p></div>;
            })}
          </div>
          <div className="space-y-3">
            <button onClick={() => setActivePage("onboarding")}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" /> Get Started
            </button>
            <button onClick={() => setActivePage("unlock")}
              className="w-full h-11 rounded-xl border border-border bg-background font-medium hover:bg-accent transition-all flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" /> I have a vault already
            </button>
          </div>
          <p className="text-xs text-center text-muted-foreground">All data is stored locally. No cloud, no tracking, no telemetry.</p>
        </motion.div>
      </div>
    );
  }

  function UnlockPage() {
    const [pw, setPw] = useState("");
    const [show, setShow] = useState(false);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-6">
          <button onClick={() => setActivePage("welcome")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg flex items-center justify-center"><Lock className="w-7 h-7 text-white" /></div>
            <h1 className="text-2xl font-bold">Unlock Vault</h1>
            <p className="text-sm text-muted-foreground">Enter your master password</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input type={show ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="Master password"
                className="flex h-11 w-full rounded-xl border border-input bg-background px-4 pr-11 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              <button onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button onClick={() => setActivePage("dashboard")} disabled={!pw}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 shadow-lg shadow-primary/25 transition-all">
              Unlock
            </button>
            <div className="flex items-center gap-3 text-sm text-muted-foreground"><div className="h-px flex-1 bg-border" /><span>or</span><div className="h-px flex-1 bg-border" /></div>
            <button className="w-full h-11 rounded-xl border border-border bg-background font-medium hover:bg-accent transition-all flex items-center justify-center gap-2">
              <ScanFace className="w-4 h-4" /> Windows Hello Face Unlock
            </button>
            <button className="w-full h-11 rounded-xl border border-border bg-background font-medium hover:bg-accent transition-all flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" /> Face Unlock
            </button>
          </div>
          <p className="text-xs text-center text-muted-foreground"><button className="hover:text-foreground transition-colors underline underline-offset-2">Forgot master password?</button></p>
        </motion.div>
      </div>
    );
  }

  function OnboardingPage() {
    const steps = ["Create Password", "Recovery Key", "Create Vault", "Security"];
    const next = () => { if (onboardingStep < 4) setOnboardingStep(s => s + 1); };
    const prev = () => { if (onboardingStep > 1) setOnboardingStep(s => s - 1); };
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div key={onboardingStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-lg space-y-6">
          <div className="space-y-3">
            <div className="h-2 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(onboardingStep / 4) * 100}%` }} /></div>
            <div className="flex justify-center gap-2">{steps.map((_, i) => <div key={i} className={`w-2.5 h-2.5 rounded-full ${i + 1 <= onboardingStep ? "bg-primary" : "bg-secondary"}`} />)}</div>
          </div>
          <div className="rounded-xl border bg-card/60 p-6 space-y-4">
            {onboardingStep === 1 && (
              <>
                <div className="text-center space-y-2"><Lock className="w-8 h-8 text-primary mx-auto" /><h2 className="text-xl font-bold">Create Master Password</h2><p className="text-sm text-muted-foreground">This is the only password you'll need to remember.</p></div>
                <div className="space-y-3">
                  <div><label className="text-sm font-medium">Master Password</label>
                    <input type="password" value={masterPassword} onChange={e => setMasterPassword(e.target.value)} placeholder="Enter master password"
                      className="flex h-11 w-full rounded-xl border border-input bg-background px-4 text-sm mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
                  <div><label className="text-sm font-medium">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password"
                      className="flex h-11 w-full rounded-xl border border-input bg-background px-4 text-sm mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
                  {masterPassword && <div className="space-y-1"><div className="h-1.5 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full bg-green-500" style={{ width: "75%" }} /></div><p className="text-xs text-green-500 font-medium">Strong (75/100)</p></div>}
                </div>
              </>
            )}
            {onboardingStep === 2 && (
              <>
                <div className="text-center space-y-2"><Key className="w-8 h-8 text-primary mx-auto" /><h2 className="text-xl font-bold">Recovery Key</h2><p className="text-sm text-muted-foreground">Save this key — it's the only way to recover your vault if you forget your password.</p></div>
                <div className="p-4 rounded-xl bg-muted/30">
                  <p className="text-lg font-mono tracking-widest text-center break-all select-all">{recoveryKey}</p>
                </div>
                <button onClick={() => handleCopy("recovery", recoveryKey)} className="w-full h-10 rounded-xl border border-border bg-background font-medium hover:bg-accent transition-all flex items-center justify-center gap-2 text-sm">
                  {copiedId === "recovery" ? <><Check className="w-4 h-4 text-green-500" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Recovery Key</>}
                </button>
                <label className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <input type="checkbox" className="mt-0.5" />
                  <span className="text-xs text-muted-foreground">I understand that if I lose both my master password and recovery key, my data is permanently unrecoverable.</span>
                </label>
              </>
            )}
            {onboardingStep === 3 && (
              <>
                <div className="text-center space-y-2"><Sparkles className="w-8 h-8 text-primary mx-auto" /><h2 className="text-xl font-bold">Create Your Vault</h2><p className="text-sm text-muted-foreground">Initializing your encrypted vault with Argon2id key derivation...</p></div>
                <div className="flex items-center justify-center py-8"><div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div></div>
                <div className="space-y-2 text-sm">
                  {["Generating encryption keys", "Creating secure vault", "Configuring recovery"].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground"><div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center"><Check className="w-3 h-3 text-green-500" /></div>{s}</div>
                  ))}
                </div>
              </>
            )}
            {onboardingStep === 4 && (
              <>
                <div className="text-center space-y-2"><ShieldCheck className="w-8 h-8 text-green-500 mx-auto" /><h2 className="text-xl font-bold">All Set!</h2><p className="text-sm text-muted-foreground">Your vault is ready. Start securing your digital life.</p></div>
                <div className="grid grid-cols-2 gap-3">
                  {["Zero-Knowledge", "AES-256-GCM", "Argon2id", "Offline-First"].map((s, i) => (
                    <div key={i} className="p-3 rounded-xl bg-green-500/5 border border-green-500/10 text-center text-sm font-medium text-green-500">{s}</div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex gap-3">
            {onboardingStep > 1 && <button onClick={prev} className="flex-1 h-11 rounded-xl border border-border bg-background font-medium hover:bg-accent transition-all">Back</button>}
            {onboardingStep < 4
              ? <button onClick={next} className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all">Continue</button>
              : <button onClick={() => setActivePage("dashboard")} className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all">Go to Dashboard</button>}
          </div>
        </motion.div>
      </div>
    );
  }

  function DashboardPage() {
    const stats = [
      { label: "Passwords", icon: Key, value: mockSecrets.filter(s => s.category === "password").length, color: "text-blue-500", bg: "bg-blue-500/10", page: "passwords" as PageId },
      { label: "Passkeys", icon: Fingerprint, value: mockPasskeys.length, color: "text-purple-500", bg: "bg-purple-500/10", page: "passkeys" as PageId },
      { label: "Documents", icon: FileText, value: mockDocuments.length, color: "text-emerald-500", bg: "bg-emerald-500/10", page: "documents" as PageId },
      { label: "Security Score", icon: Shield, value: `${securityReport.score}%`, color: "text-amber-500", bg: "bg-amber-500/10", page: "security" as PageId },
    ];
    return (
      <div className="space-y-8 max-w-6xl">
        <PageHeader title="Dashboard" subtitle="Welcome to your secure vault" action={<Badge variant="success" className="gap-1.5 px-3 py-1.5 rounded-lg"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Vault Active</Badge>} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{stats.map((s, i) => {
          const Icon = s.icon;
          return <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
            onClick={() => setActivePage(s.page)} className="cursor-pointer group">
            <div className="rounded-xl border bg-card/60 p-5 h-full group-hover:-translate-y-0.5 transition-all"><div className={`p-2.5 rounded-xl ${s.bg} w-fit mb-4`}><Icon className={`w-5 h-5 ${s.color}`} /></div><p className="text-3xl font-bold tracking-tight">{s.value}</p><p className="text-xs text-muted-foreground mt-1.5">{s.label}</p></div>
          </motion.div>;
        })}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "New Password", page: "passwords" as PageId, icon: Key, color: "from-blue-500 to-blue-600" },
            { label: "Add Passkey", page: "passkeys" as PageId, icon: Fingerprint, color: "from-purple-500 to-purple-600" },
            { label: "Upload Document", page: "documents" as PageId, icon: FileText, color: "from-emerald-500 to-emerald-600" },
            { label: "Security Report", page: "security" as PageId, icon: Shield, color: "from-amber-500 to-amber-600" },
          ].map((l, i) => {
            const Icon = l.icon;
            return <motion.button key={l.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.02 }}
              onClick={() => setActivePage(l.page)} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-br ${l.color} rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity`} />
              <div className="relative rounded-xl border bg-card/60 p-5 flex flex-col items-center text-center gap-3 group-hover:-translate-y-0.5 transition-all"><div className="p-3 rounded-xl bg-primary/5"><Icon className="w-6 h-6 text-primary" /></div><span className="text-sm font-medium">{l.label}</span></div>
            </motion.button>;
          })}
        </div>
        <div className="rounded-xl border bg-card/60">
          <div className="p-6 pb-2"><h3 className="text-sm font-medium flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Recent Activity</h3></div>
          <div className="p-6 pt-2 space-y-1">
            {[
              { action: "New login from Personal Laptop", time: "2 min ago", severity: "info" },
              { action: "Password rotated: github.com", time: "1 hour ago", severity: "info" },
              { action: "Security scan completed — no issues found", time: "3 hours ago", severity: "success" },
              { action: "Weak password detected: reddit.com", time: "Yesterday", severity: "warning" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2.5 px-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">{a.severity === "warning" ? <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> : a.severity === "success" ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <Info className="w-3.5 h-3.5 text-blue-500" />}<span>{a.action}</span></div>
                <span className="text-muted-foreground text-xs">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function PasswordsPage() {
    const passwords = mockSecrets.filter(s => s.category === "password");
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Passwords" subtitle={`${passwords.length} saved passwords`} action={
          <div className="flex gap-2">
            <button onClick={() => setPasswordGenOpen(true)} className="h-10 px-4 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-all flex items-center gap-2"><Zap className="w-4 h-4" /> Generate</button>
            <button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center gap-2"><Plus className="w-4 h-4" /> Add Password</button>
          </div>
        } />
        <div className="flex gap-2 mb-2">
          {["All", "Favorites", "Weak"].map(t => <button key={t} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${t === "All" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>{t}</button>)}
        </div>
        <div className="space-y-2">
          {passwords.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="rounded-xl border bg-card/60 p-4 flex items-center gap-4 group hover:border-primary/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 relative">
                <Key className="w-5 h-5 text-primary" />
                {p.favorite && <Star className="w-3 h-3 text-amber-500 absolute -top-1 -right-1 fill-amber-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><p className="text-sm font-medium">{p.title}</p>{p.url && <ExternalLink className="w-3 h-3 text-muted-foreground" />}</div>
                <p className="text-xs text-muted-foreground truncate">{p.username}</p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <StrengthBar score={p.strength_score} />
                <span className="text-xs text-muted-foreground w-12 text-right">{p.strength_score ?? "--"}/100</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-muted-foreground hover:text-foreground transition-colors p-1"><Copy className="w-4 h-4" /></button>
                <button className="text-muted-foreground hover:text-foreground transition-colors p-1"><ExternalLink className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
        {passwordGenOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center" onClick={e => { if (e.target === e.currentTarget) setPasswordGenOpen(false); }}>
            <div className="w-full max-w-md rounded-xl border bg-background p-6 space-y-4 shadow-2xl">
              <h3 className="text-lg font-semibold">Password Generator</h3>
              <div className="p-4 rounded-xl bg-muted/30">
                <p className="text-xl font-mono tracking-wider text-center break-all">{genPassword}</p>
              </div>
              <div className="space-y-1"><StrengthBar score={85} /><div className="flex justify-between text-xs"><span className="text-green-500 font-medium">Strong</span><span className="text-muted-foreground">Length: 16</span></div></div>
              <div className="flex justify-between gap-2">
                <button onClick={() => handleCopy("gen", genPassword)} className="flex-1 h-10 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-all flex items-center justify-center gap-2">{copiedId === "gen" ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}</button>
                <button onClick={() => setGenPassword(Array.from({ length: 16 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[Math.floor(Math.random() * 72)]).join(""))}
                  className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all">Generate New</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function VaultPage() {
    const filtered = vaultCategory === "all" ? mockSecrets : mockSecrets.filter(s => s.category === vaultCategory);
    const CategoryIcon = CATEGORIES.find(c => c.id === vaultCategory)?.icon || Package;
    return (
      <div className="flex gap-6 max-w-6xl">
        <div className="w-56 shrink-0 space-y-1">
          <button onClick={() => setVaultCategory("all")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${vaultCategory === "all" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent/40"}`}>
            <Package className="w-4 h-4" />All Items <span className="ml-auto text-xs">{mockSecrets.length}</span>
          </button>
          <div className="h-px bg-border/50 my-2" />
          {CATEGORIES.map(cat => {
            const count = mockSecrets.filter(s => s.category === cat.id).length;
            const Icon = cat.icon;
            return <button key={cat.id} onClick={() => setVaultCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${vaultCategory === cat.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent/40"}`}>
              <Icon className="w-4 h-4" /><span className="flex-1 text-left">{cat.label}</span>{count > 0 && <span className="text-xs">{count}</span>}
            </button>;
          })}
          <div className="pt-3"><button className="w-full h-9 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-1"><Plus className="w-3.5 h-3.5" /> New Item</button></div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3 mb-4"><CategoryIcon className="w-5 h-5 text-primary" /><span className="text-2xl font-bold tracking-tight"><span className="text-gradient">{vaultCategory === "all" ? "All Items" : CATEGORIES.find(c => c.id === vaultCategory)?.label}</span></span><Badge variant="secondary">{filtered.length}</Badge></div>
          {filtered.map((s, i) => {
            const Icon = CATEGORIES.find(c => c.id === s.category)?.icon || Package;
            return <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
              className="rounded-xl border bg-card/60 p-4 flex items-center gap-4 group hover:border-primary/20 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-primary" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium flex items-center gap-2">{s.title}{s.favorite && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}</p><p className="text-xs text-muted-foreground truncate">{s.username}</p></div>
              {s.strength_score !== null && <StrengthBar score={s.strength_score} />}
              <span className="text-xs text-muted-foreground">{s.usage_count} uses</span>
            </motion.div>;
          })}
        </div>
      </div>
    );
  }

  function PasskeysPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Passkeys" subtitle="FIDO2/WebAuthn credentials" action={<button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center gap-2"><Plus className="w-4 h-4" /> Register Passkey</button>} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPasskeys.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card/60 p-5 space-y-3 hover:border-primary/20 transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center"><Fingerprint className="w-5 h-5 text-purple-500" /></div>
                  <div><p className="text-sm font-medium">{p.relying_party}</p><p className="text-xs text-muted-foreground">{p.device_name}</p></div>
                </div>
                <Badge variant={p.device_type === "platform" ? "info" : "warning"}>{p.device_type === "platform" ? "Platform" : "Cross-platform"}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                <span>Created: {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>Last used: {new Date(p.last_used_at!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  function DocumentsPage() {
    return (
      <div className="space-y-6 max-w-5xl">
        <PageHeader title="Documents" subtitle="Encrypted document storage" action={<button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center gap-2"><Download className="w-4 h-4" /> Upload Document</button>} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDocuments.map((d, i) => {
            const Icon = getMimeIcon(d.mime_type);
            return <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card/60 p-5 space-y-3 group hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Icon className="w-6 h-6 text-emerald-500" /></div>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"><Download className="w-4 h-4" /></button>
              </div>
              <div><p className="text-sm font-medium truncate">{d.title}</p><p className="text-xs text-muted-foreground truncate">{d.file_name}</p></div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                <span>{formatSize(d.file_size)}</span><span>v{d.version}</span>
              </div>
            </motion.div>;
          })}
        </div>
      </div>
    );
  }

  function IdentityPage() {
    const [identityTab, setIdentityTab] = useState("all");
    const filtered = identityTab === "all" ? mockIdentities : mockIdentities.filter(i => i.category === identityTab);
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Identity" subtitle="Manage your identity documents" action={<button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center gap-2"><Plus className="w-4 h-4" /> Add Identity</button>} />
        <div className="flex gap-2">{[{ id: "all", label: "All" }, { id: "passport", label: "Passports" }, { id: "drivers_license", label: "Licenses" }, { id: "national_id", label: "National ID" }, { id: "insurance", label: "Insurance" }].map(t =>
          <button key={t.id} onClick={() => setIdentityTab(t.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${identityTab === t.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>{t.label}</button>
        )}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card/60 p-5 space-y-3 hover:border-primary/20 transition-all group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-xl ${getIdentityColor(r.category)} flex items-center justify-center`}><UserCircle className="w-5 h-5" /></div>
                  <div><p className="text-sm font-medium">{r.title}</p><p className="text-xs text-muted-foreground">{r.full_name}</p></div>
                </div>
                <Badge variant="success">Valid</Badge>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>#{r.document_number}</p>
                <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{r.expiration_date ? `Expires ${new Date(r.expiration_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}` : "No expiration"}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  function ExpensesPage() {
    const totalExpenses = Math.abs(mockExpenses.filter(e => e.expense_type === "expense").reduce((sum, e) => sum + e.amount, 0));
    const totalIncome = mockExpenses.filter(e => e.expense_type === "income").reduce((sum, e) => sum + e.amount, 0);
    const balance = totalIncome - totalExpenses;
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Expenses" subtitle="Track income and expenses" action={<button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center gap-2"><Plus className="w-4 h-4" /> Add Transaction</button>} />
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Expenses", value: totalExpenses, color: "text-rose-500" },
            { label: "Total Income", value: totalIncome, color: "text-emerald-500" },
            { label: "Balance", value: balance, color: balance >= 0 ? "text-blue-500" : "text-amber-500" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border bg-card/60 p-4"><p className={`text-2xl font-bold ${s.color}`}>${(s.value / 100).toFixed(2)}</p><p className="text-xs text-muted-foreground mt-1">{s.label}</p></div>
          ))}
        </div>
        <div className="flex gap-2">{[{ id: "all", label: "All" }, { id: "expense", label: "Expenses" }, { id: "income", label: "Income" }].map(t =>
          <button key={t.id} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${t.id === "all" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>{t.label}</button>
        )}</div>
        <div className="space-y-2">
          {mockExpenses.map((e, i) => {
            const CatIcon = EXPENSE_CATEGORY_ICONS[e.category] || MoreHorizontal;
            return <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="rounded-xl border bg-card/60 p-4 flex items-center gap-4 group hover:border-primary/20 transition-all">
              <div className={`w-10 h-10 rounded-xl ${e.expense_type === "expense" ? "bg-rose-500/10" : "bg-emerald-500/10"} flex items-center justify-center`}>
                <CatIcon className={`w-5 h-5 ${e.expense_type === "expense" ? "text-rose-500" : "text-emerald-500"}`} />
              </div>
              <div className="flex-1"><p className="text-sm font-medium">{e.title}</p><p className="text-xs text-muted-foreground">{e.category} · {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p></div>
              <div className="text-right"><p className={`text-sm font-bold ${e.expense_type === "expense" ? "text-rose-500" : "text-emerald-500"}`}>{formatAmount(e.amount)}</p></div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all"><button className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5" /></button><button className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button></div>
            </motion.div>;
          })}
        </div>
      </div>
    );
  }

  function MfaPage() {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Two-Factor Authentication" subtitle="TOTP authenticator codes" action={<button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center gap-2"><Plus className="w-4 h-4" /> Add Account</button>} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockTotpTokens.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card/60 p-5 space-y-3">
              <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><Smartphone className="w-5 h-5 text-orange-500" /></div><div><p className="text-sm font-medium">{t.issuer}</p><p className="text-xs text-muted-foreground">{t.label}</p></div></div></div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono font-bold tracking-[0.25em] text-primary">{t.code.slice(0, 3)} {t.code.slice(3)}</span>
                <button onClick={() => handleCopy(t.id, t.code)} className="text-muted-foreground hover:text-foreground transition-colors">{copiedId === t.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}</button>
              </div>
              <div className="space-y-1"><div className="flex justify-between text-xs text-muted-foreground"><span>Code expires</span><span>{t.remaining}s</span></div><div className="h-1.5 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${(t.remaining / t.period) * 100}%` }} /></div></div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  function SecurityPage() {
    const score = securityReport.score;
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;
    return (
      <div className="space-y-6 max-w-5xl">
        <PageHeader title="Security" subtitle="Vault health & recommendations" action={<button className="h-10 px-4 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-all flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Rescan</button>} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border bg-card/60 p-6 flex flex-col items-center justify-center">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" /><circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="text-amber-500" /></svg>
            <div className="absolute flex flex-col items-center"><span className="text-3xl font-bold text-amber-500">{score}</span><span className="text-xs text-muted-foreground">/100</span></div>
            <p className="text-xs text-muted-foreground mt-3">{score >= 80 ? "Good" : score >= 60 ? "Fair" : score >= 40 ? "Poor" : "Critical"}</p>
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-4">
            {[
              { label: "Weak Passwords", value: securityReport.weak_passwords, color: "text-red-500", bg: "bg-red-500/10", icon: AlertTriangle },
              { label: "Reused", value: securityReport.reused_passwords, color: "text-orange-500", bg: "bg-orange-500/10", icon: AlertCircle },
              { label: "Old Credentials", value: securityReport.old_credentials, color: "text-yellow-500", bg: "bg-yellow-500/10", icon: Clock },
            ].map((s, i) => {
              const Icon = s.icon;
              return <div key={i} className="rounded-xl border bg-card/60 p-4"><div className={`p-2 rounded-lg ${s.bg} w-fit mb-3`}><Icon className={`w-4 h-4 ${s.color}`} /></div><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-xs text-muted-foreground mt-1">{s.label}</p></div>;
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Security Recommendations</h3>
            {securityReport.recommendations.map((r, i) => {
              const SevIcon = r.severity === "critical" ? AlertOctagon : r.severity === "high" ? AlertTriangle : r.severity === "medium" ? AlertCircle : Info;
              const sevColor = r.severity === "critical" ? "text-red-500 bg-red-500/10" : r.severity === "high" ? "text-orange-500 bg-orange-500/10" : r.severity === "medium" ? "text-amber-500 bg-amber-500/10" : "text-blue-500 bg-blue-500/10";
              return <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border bg-card/60 p-4 flex items-start gap-4">
                <div className={`p-2 rounded-lg shrink-0 ${sevColor}`}><SevIcon className="w-4 h-4" /></div>
                <div className="flex-1"><p className="text-sm font-medium">{r.title}</p><p className="text-xs text-muted-foreground mt-0.5">{r.description}</p></div>
                <button className="text-xs font-medium text-primary hover:underline shrink-0">{r.action}</button>
              </motion.div>;
            })}
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Info className="w-4 h-4 text-primary" /> Security Stats</h3>
            <div className="rounded-xl border bg-card/60 p-4 space-y-3">
              {[
                { label: "Total Items", value: securityReport.total_items },
                { label: "Missing MFA", value: securityReport.missing_mfa },
                { label: "Unused Accounts", value: securityReport.unused_accounts },
                { label: "Breached", value: securityReport.breached_accounts },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{s.label}</span><span className="font-medium">{s.value}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ScannerPage() {
    const [scanMode, setScanMode] = useState<"directory" | "system">("directory");
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Secret Scanner" subtitle="Find exposed credentials in your filesystem" action={<button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center gap-2"><Scan className="w-4 h-4" /> {scanMode === "directory" ? "Scan Directory" : "Scan System"}</button>} />
        <div className="flex gap-2">{["directory", "system"].map(m => (
          <button key={m} onClick={() => setScanMode(m as typeof scanMode)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${scanMode === m ? "bg-primary/15 text-primary" : "border border-border bg-background text-muted-foreground hover:text-foreground"}`}>{m === "directory" ? "Scan Directory" : "Scan OS & Environment"}</button>
        ))}</div>
        <div className="rounded-xl border bg-card/60 p-6 text-center space-y-3"><div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"><Scan className="w-7 h-7 text-primary" /></div><p className="text-sm font-medium">Local Secret Scanner</p><p className="text-xs text-muted-foreground max-w-md mx-auto">Scan your local filesystem and directories to find accidentally exposed API keys, tokens, or credentials before they become a problem.</p></div>
        <div className="grid grid-cols-3 gap-4">
          {[{ label: "Files Scanned", value: 142 }, { label: "Total Findings", value: 3, color: "text-amber-500" }, { label: "Duration", value: "847ms" }].map((s, i) => (
            <div key={i} className="rounded-xl border bg-card/60 p-4 text-center"><p className={`text-2xl font-bold ${s.color || "text-foreground"}`}>{s.value}</p><p className="text-xs text-muted-foreground mt-1">{s.label}</p></div>
          ))}
        </div>
        <div className="flex gap-2">{[{ id: "all", label: "All" }, { id: "critical", label: "Critical" }, { id: "high", label: "High" }].map(t =>
          <button key={t.id} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${t.id === "all" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>{t.label}</button>
        )}</div>
        <div className="space-y-2">
          {scannerFindings.map((f, i) => {
            const SevIcon = f.severity === "critical" ? AlertOctagon : f.severity === "high" ? AlertTriangle : f.severity === "medium" ? AlertCircle : Info;
            const sevColor = f.severity === "critical" ? "text-red-500" : f.severity === "high" ? "text-orange-500" : f.severity === "medium" ? "text-amber-500" : "text-blue-500";
            return <motion.div key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card/60 p-4 space-y-2">
              <div className="flex items-start gap-3"><SevIcon className={`w-5 h-5 shrink-0 mt-0.5 ${sevColor}`} />
                <div className="flex-1"><p className="text-sm font-medium">{f.description}</p><div className="flex items-center gap-2 mt-1"><Badge variant={f.severity === "critical" ? "destructive" : f.severity === "high" ? "warning" : "info"}>{f.finding_type}</Badge><span className="text-xs text-muted-foreground">{f.file_path}:{f.line_number}</span></div></div>
              </div>
              {f.content_preview && <div className="p-2 rounded-lg bg-muted/30"><code className="text-xs font-mono text-muted-foreground">{f.content_preview}</code></div>}
              <div className="flex gap-2 justify-end"><button className="text-xs px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 font-medium hover:bg-green-500/20 transition-colors flex items-center gap-1"><Download className="w-3 h-3" /> Import to Vault</button><button className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-medium hover:bg-destructive/10 hover:text-destructive transition-colors">Ignore</button></div>
            </motion.div>;
          })}
        </div>
      </div>
    );
  }

  function SettingsPage() {
    const [tab, setTab] = useState("general");
    const [compactSidebar, setCompactSidebar] = useState(false);
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader title="Settings" subtitle="Application preferences" />
        <div className="flex gap-1 p-1 rounded-lg bg-muted w-fit">
          {["general", "security", "backup", "about"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
        {tab === "general" && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-card/60 p-5 space-y-4">
              <div><p className="text-sm font-medium mb-3">Theme</p><div className="flex gap-2">{(["dark", "light", "system"] as const).map(t => (
                <button key={t} onClick={() => { if (t === "dark" !== dark) onToggleDark(); }}
                  className={`flex-1 flex items-center gap-2 justify-center h-10 rounded-xl text-sm font-medium transition-all capitalize ${(t === "dark" && dark) || (t === "light" && !dark) || (t === "system" && !dark && !dark) ? "bg-primary/15 text-primary" : "border border-border bg-background text-muted-foreground hover:text-foreground"}`}>
                  {t === "dark" ? <Moon className="w-4 h-4" /> : t === "light" ? <Sun className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}{t}</button>
              ))}</div></div>
              <div><p className="text-sm font-medium mb-3">Accent Color</p><div className="flex gap-3">{["blue", "purple", "emerald", "rose", "amber"].map(c => (
                <button key={c} className={`w-8 h-8 rounded-full border-2 transition-all ${c === "blue" ? "bg-blue-500" : c === "purple" ? "bg-purple-500" : c === "emerald" ? "bg-emerald-500" : c === "rose" ? "bg-rose-500" : "bg-amber-500"} ${c === "purple" ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-foreground/20"}`} />
              ))}</div></div>
            </div>
            <div className="flex items-center justify-between rounded-xl border bg-card/60 p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-muted"><Monitor className="w-4 h-4 text-muted-foreground" /></div><div><p className="text-sm font-medium">Compact Sidebar</p><p className="text-xs text-muted-foreground">Show icons only in sidebar</p></div></div>
              <button onClick={() => { setCompactSidebar(!compactSidebar); setSidebarCollapsed(!compactSidebar); }} className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors ${compactSidebar ? "bg-primary" : "bg-input"}`}>
                <span className={`block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${compactSidebar ? "translate-x-4" : "translate-x-0"}`} />
              </button>
            </div>
          </div>
        )}
        {tab === "security" && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-card/60 p-5"><p className="text-sm font-medium mb-3">Vault Timeout</p><div className="flex gap-2">{[1, 5, 15, 30, 60].map(m => (
              <button key={m} className={`flex-1 h-10 rounded-xl text-sm font-medium transition-all ${m === 15 ? "bg-primary/15 text-primary" : "border border-border bg-background text-muted-foreground hover:text-foreground"}`}>{m}m</button>
            ))}</div></div>
            {[
              { icon: Lock, label: "Windows Hello", desc: "Enable biometric unlock" },
              { icon: Camera, label: "Face Unlock", desc: "Enable camera-based face recognition" },
              { icon: ScanFace, label: "Auto-trigger Face Unlock", desc: "Automatically start face detection on unlock screen" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border bg-card/60 p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-muted"><s.icon className="w-4 h-4 text-muted-foreground" /></div><div><p className="text-sm font-medium">{s.label}</p><p className="text-xs text-muted-foreground">{s.desc}</p></div></div>
                <button className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors ${i === 0 ? "bg-primary" : "bg-input"}`}><span className={`block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${i === 0 ? "translate-x-4" : "translate-x-0"}`} /></button>
              </div>
            ))}
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5"><p className="text-sm font-medium text-red-500 mb-1">Danger Zone</p><p className="text-xs text-muted-foreground mb-3">Delete your active vault and all its data. This action cannot be undone.</p><button className="h-9 px-4 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-500/90 transition-all">Delete active vault</button></div>
          </div>
        )}
        {tab === "backup" && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-card/60 p-5 space-y-3"><p className="text-sm font-medium">Local Backup</p><div className="flex gap-2"><button className="flex-1 h-10 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-all">Create Backup</button><button className="flex-1 h-10 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-all">Restore Backup</button></div></div>
            <div className="rounded-xl border bg-card/60 p-5 space-y-3"><p className="text-sm font-medium">Cloud Sync</p><div className="flex items-center justify-between p-3 rounded-xl bg-muted/30"><div className="flex items-center gap-3"><Globe className="w-5 h-5 text-primary" /><div><p className="text-sm font-medium">Google Drive</p><p className="text-xs text-muted-foreground">Sync your encrypted vault to the cloud</p></div></div><Badge variant="info">Not Connected</Badge></div><button className="w-full h-10 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-all">Link Google Drive</button></div>
            <div className="rounded-xl border bg-card/60 p-5 space-y-3"><p className="text-sm font-medium">Export & Import</p><div className="flex gap-2"><button className="flex-1 h-10 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-all">Export JSON</button><button className="flex-1 h-10 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-all">Export CSV</button></div><div className="flex gap-2"><button className="flex-1 h-10 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-all">Import JSON</button><button className="flex-1 h-10 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-all">Bitwarden</button></div></div>
          </div>
        )}
        {tab === "about" && (
          <div className="rounded-xl border bg-card/60 p-6 space-y-4 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl shadow-primary/30 flex items-center justify-center"><Wallet className="w-7 h-7 text-white" /></div>
            <div><h2 className="text-xl font-bold">NGXSMK Wallet</h2><Badge variant="secondary" className="mt-1">v1.0.0</Badge><p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">Privacy-first, fully local Digital Identity, Secrets, Password & Secure Document Manager</p></div>
            <button className="h-10 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all">Check for Updates</button>
            <div className="grid grid-cols-2 gap-3 text-xs text-left">
              {["Zero-Knowledge Architecture", "AES-256-GCM Encryption", "Argon2id Key Derivation", "Offline-First Design", "No Telemetry", "Open Source (MIT)"].map((f, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30"><CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" /><span className="text-muted-foreground">{f}</span></div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const sidebarVisible = isUnlocked;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/3 via-transparent to-blue-500/3 pointer-events-none" />
      {sidebarVisible && (
        <aside className={`fixed left-0 top-0 h-full z-30 flex flex-col border-r border-border/50 bg-background/80 backdrop-blur-xl transition-[width] duration-300 ${sidebarCollapsed ? "w-16" : "w-60"}`}>
          <div className="flex items-center h-14 px-3 border-b border-border/50">
            {!sidebarCollapsed ? (
              <div className="flex items-center gap-2.5 overflow-hidden"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20 flex items-center justify-center shrink-0"><Wallet className="w-4 h-4 text-primary-foreground" /></div><span className="text-sm font-semibold tracking-tight">NGXSMK</span></div>
            ) : (
              <div className="mx-auto"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20 flex items-center justify-center"><Wallet className="w-4 h-4 text-primary-foreground" /></div></div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-1.5 space-y-5 scrollbar-thin">
            {navSections.map((section) => (
              <div key={section.label ?? "bottom"}>
                {section.label && !sidebarCollapsed && <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/30 select-none">{section.label}</p>}
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
            <button className={`relative flex items-center gap-3 w-full px-2.5 py-2 rounded-xl text-sm font-medium transition-all text-muted-foreground/50 hover:text-foreground hover:bg-accent/40 ${sidebarCollapsed ? "justify-center px-0" : ""}`}>
              <Search className="w-5 h-5 shrink-0" />{!sidebarCollapsed && <><span className="flex-1 text-left">Search</span><kbd className="hidden md:inline-flex items-center gap-1 rounded-md border border-border/40 bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/70"><span>⌘</span>K</kbd></>}
            </button>
            <button className={`relative flex items-center gap-3 w-full px-2.5 py-2 rounded-xl text-sm font-medium transition-all text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 ${sidebarCollapsed ? "justify-center px-0" : ""}`}>
              <Lock className="w-5 h-5 shrink-0" />{!sidebarCollapsed && <span>Lock Vault</span>}
            </button>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`relative flex items-center gap-3 w-full px-2.5 py-2 rounded-xl text-sm font-medium transition-all text-muted-foreground/40 hover:text-foreground hover:bg-accent/40 ${sidebarCollapsed ? "justify-center px-0" : ""}`}>
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <><ChevronLeft className="w-5 h-5 shrink-0" /><span>Collapse</span></>}
            </button>
          </div>
        </aside>
      )}
      {sidebarVisible && <div style={{ width: sidebarCollapsed ? 64 : 240 }} />}
      <main className="flex-1 overflow-auto relative">
        {sidebarVisible && (
          <header className="sticky top-0 z-20 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center justify-between h-14 px-6 gap-3">
              <div className="flex items-center gap-3">
                {onBack && <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Back to Home</button>}
                <Badge variant="info" className="gap-1.5 px-3 py-1.5 rounded-lg"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Demo Mode</Badge>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={onToggleDark} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">{dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
                <div className="flex items-center gap-2 pl-2 border-l border-border/50"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-white">D</div><span className="text-sm font-medium hidden sm:block">Demo User</span></div>
              </div>
            </div>
          </header>
        )}
        <div className={sidebarVisible ? "p-8 pb-10" : ""}>
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
