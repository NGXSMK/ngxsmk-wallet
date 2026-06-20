import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Key,
  Bell,
  Shield,
  Lock,
  Unlock,
  Copy,
  Check,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Sun,
  Moon,
  Monitor,
  Wallet,
  Fingerprint,
  FileText,
  Smartphone,
  Scan,
  LayoutDashboard,
  Receipt,
  UserCircle,
  Palette,
  ChevronRight,
  Search,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <motion.div variants={itemVariants}>
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm shadow-sm transition-all duration-200">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <h3 className="text-base font-semibold leading-none tracking-tight">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="p-6 pt-4">{children}</div>
      </div>
    </motion.div>
  );
}

function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "info";
  className?: string;
}) {
  const variants: Record<string, string> = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    outline: "text-foreground",
    destructive: "border-transparent bg-red-500/10 text-red-500",
    success: "border-transparent bg-green-500/10 text-green-500",
    warning: "border-transparent bg-yellow-500/10 text-yellow-500",
    info: "border-transparent bg-blue-500/10 text-blue-500",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

function Button({
  children,
  variant = "default",
  size = "default",
  disabled,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent/80 hover:text-accent-foreground",
    destructive: "bg-red-500 text-white hover:bg-red-500/90 shadow-lg shadow-red-500/20",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizes: Record<string, string> = {
    sm: "h-9 rounded-lg px-3 text-sm",
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-11 rounded-xl px-8 text-base",
  };
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({
  placeholder,
  type = "text",
  error,
  value,
  onChange,
  className = "",
}: {
  placeholder?: string;
  type?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
          error ? "border-red-500" : "border-input hover:border-muted-foreground/30"
        } ${className}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function calculateStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^a-zA-Z0-9]/.test(password)) score += 15;
  if (password.length > 20) score += 10;
  const label = score >= 90 ? "Very Strong" : score >= 70 ? "Strong" : score >= 50 ? "Medium" : score >= 30 ? "Weak" : "Very Weak";
  const color = score >= 90 ? "#22c55e" : score >= 70 ? "#84cc16" : score >= 50 ? "#eab308" : score >= 30 ? "#f97316" : "#ef4444";
  return { score, label, color };
}

export function DemoPage() {
  const [password, setPassword] = useState("Demo@123");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [progress, setProgress] = useState(45);
  const [copied, setCopied] = useState(false);
  const [themeDemo, setThemeDemo] = useState<"light" | "dark" | "system">("system");
  const [activeTab, setActiveTab] = useState("overview");

  const strength = calculateStrength(password);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-gradient">UI Demo</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Component showcase and interactive examples
            </p>
          </div>
          <Badge variant="info" className="gap-1.5 rounded-lg px-3 py-1.5">
            <Eye className="h-3.5 w-3.5" />
            {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </Badge>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Buttons */}
        <Section title="Buttons" description="Variants and sizes">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary/90 active:scale-[0.97]">
                <Key className="h-4 w-4" />
              </button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges" description="Status and labeling">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success" className="gap-1">
              <CheckCircle className="h-3 w-3" /> Active
            </Badge>
            <Badge variant="warning" className="gap-1">
              <AlertTriangle className="h-3 w-3" /> Expiring
            </Badge>
            <Badge variant="info" className="gap-1">
              <Bell className="h-3 w-3" /> 3 Alerts
            </Badge>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Cards" description="Content containers with different styles">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-primary/10 bg-primary/5 p-5">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Security Card</p>
                <p className="text-xs text-muted-foreground">Protected content container</p>
              </div>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/60 p-5 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="rounded-xl bg-green-500/10 p-3">
                  <Unlock className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-sm font-medium">Glass Card</p>
                <p className="text-xs text-muted-foreground">Morphism style</p>
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-xl p-5"
              style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(168,85,247,0.1))" }}
            >
              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                <div className="rounded-xl bg-gradient-to-br from-primary to-purple-500 p-3">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">Gradient Card</p>
                <p className="text-xs text-muted-foreground">Custom background</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Form Controls */}
        <Section title="Form Controls" description="Inputs, selects, and password fields">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Input</label>
                <Input placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">With Error</label>
                <Input placeholder="Invalid input" error="This field is required" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Password with Strength Meter</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="mt-2 space-y-1.5">
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${strength.score}%`, backgroundColor: strength.color }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: strength.color }}>
                    {strength.label} ({strength.score}/100)
                  </span>
                  <button
                    onClick={() => handleCopy(password)}
                    className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Dropdown</label>
                <div className="relative">
                  <select className="flex h-10 w-full appearance-none rounded-xl border border-input bg-background/50 px-3 py-2 pr-9 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    <option>Standard Plan</option>
                    <option>Premium Plan</option>
                    <option>Enterprise Plan</option>
                  </select>
                  <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme Preference</label>
                <div className="relative">
                  <select
                    value={themeDemo}
                    onChange={(e) => setThemeDemo(e.target.value as typeof themeDemo)}
                    className="flex h-10 w-full appearance-none rounded-xl border border-input bg-background/50 px-3 py-2 pr-9 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                  <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Interactive Controls */}
        <Section title="Interactive Controls" description="Toggles, switches, and sliders">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive security alerts</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors ${
                  notifications ? "bg-primary" : "bg-input"
                }`}
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                    notifications ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Auto-Lock</p>
                  <p className="text-xs text-muted-foreground">Lock after inactivity</p>
                </div>
              </div>
              <button
                onClick={() => setAutoLock(!autoLock)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors ${
                  autoLock ? "bg-primary" : "bg-input"
                }`}
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                    autoLock ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                {themeDemo === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : themeDemo === "light" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Monitor className="h-4 w-4" />
                )}
                <div>
                  <p className="text-sm font-medium">Theme: {themeDemo.charAt(0).toUpperCase() + themeDemo.slice(1)}</p>
                  <p className="text-xs text-muted-foreground">Current display mode</p>
                </div>
              </div>
              <div className="flex gap-1">
                {(["light", "dark", "system"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setThemeDemo(t)}
                    className={`rounded-lg p-1.5 transition-colors ${
                      themeDemo === t
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    {t === "light" ? (
                      <Sun className="h-4 w-4" />
                    ) : t === "dark" ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Monitor className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Progress: {progress}%</span>
                <span className="text-xs text-muted-foreground">Drag to adjust</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
              />
            </div>
          </div>
        </Section>

        {/* Tabs */}
        <Section title="Tabs" description="Tabbed content navigation">
          <div className="w-full">
            <div className="inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
              {["overview", "security", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    activeTab === tab ? "bg-background text-foreground shadow-sm" : ""
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="mt-2">
              {activeTab === "overview" && (
                <div className="space-y-3">
                  <div className="rounded-xl bg-muted/30 p-4 text-sm">
                    <p>Welcome to the UI demo. This tab shows the overview of available components.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-lg bg-primary/5 p-3">
                      <p className="text-lg font-bold text-primary">14</p>
                      <p className="text-muted-foreground">Components</p>
                    </div>
                    <div className="rounded-lg bg-green-500/5 p-3">
                      <p className="text-lg font-bold text-green-500">7</p>
                      <p className="text-muted-foreground">Variants</p>
                    </div>
                    <div className="rounded-lg bg-purple-500/5 p-3">
                      <p className="text-lg font-bold text-purple-500">3</p>
                      <p className="text-muted-foreground">Sections</p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "security" && (
                <div className="space-y-3">
                  <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-4 text-sm">
                    <div className="flex items-center gap-2 font-medium text-amber-500">
                      <Shield className="h-4 w-4" />
                      Security Status
                    </div>
                    <p className="mt-1 text-muted-foreground">All systems secure. No vulnerabilities detected.</p>
                    <div className="mt-2 flex gap-2">
                      <Badge variant="success">Encrypted</Badge>
                      <Badge variant="info">2FA Active</Badge>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "settings" && (
                <div className="space-y-3 rounded-xl bg-muted/30 p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Auto-Save</span>
                    <button className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-primary shadow-sm transition-colors">
                      <span className="block h-4 w-4 translate-x-4 rounded-full bg-white shadow-lg ring-0 transition-transform" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Dark Mode</span>
                    <button className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input shadow-sm transition-colors">
                      <span className="block h-4 w-4 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* Navigation Preview */}
        <Section title="Navigation" description="Sidebar menu structure preview">
          <div className="space-y-4">
            {[
              {
                label: "Overview",
                items: [
                  { icon: LayoutDashboard, label: "Dashboard" },
                ],
              },
              {
                label: "Management",
                items: [
                  { icon: Wallet, label: "Vault" },
                  { icon: Key, label: "Passwords" },
                  { icon: Fingerprint, label: "Passkeys" },
                  { icon: FileText, label: "Documents" },
                  { icon: UserCircle, label: "Identity" },
                  { icon: Receipt, label: "Expenses" },
                ],
              },
              {
                label: "Tools",
                items: [
                  { icon: Smartphone, label: "2FA" },
                  { icon: Scan, label: "Scanner" },
                  { icon: Shield, label: "Security" },
                  { icon: Palette, label: "UI Demo" },
                ],
              },
            ].map((section) => (
              <div key={section.label}>
                <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/30">
                  {section.label}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.label === "UI Demo";
                    return (
                      <div
                        key={item.label}
                        className={`flex cursor-default items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary/15 font-semibold text-primary"
                            : "text-muted-foreground/50 hover:bg-accent/40 hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="ml-auto flex h-5 items-center rounded-md bg-primary/20 px-2 text-[10px] font-medium text-primary">
                            Active
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="border-t border-border/50 pt-3">
              <div className="flex cursor-default items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium text-muted-foreground/50 transition-colors hover:bg-accent/40 hover:text-foreground">
                <Search className="h-5 w-5 shrink-0" />
                <span className="flex-1">Search</span>
                <kbd className="hidden items-center gap-1 rounded-md border border-border/40 bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/70 md:inline-flex">
                  <span>⌘</span>K
                </kbd>
              </div>
              <div className="flex cursor-default items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium text-muted-foreground/50 transition-colors hover:bg-destructive/10 hover:text-destructive">
                <Lock className="h-5 w-5 shrink-0" />
                <span>Lock Vault</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Dialogs & Modals */}
        <Section title="Dialogs & Modals" description="Interactive overlay components">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                const el = document.getElementById("demo-dialog-overlay");
                if (el) el.classList.remove("hidden");
              }}
              variant="default"
            >
              Open Dialog
            </Button>
            <Button
              onClick={() => {
                const el = document.getElementById("demo-info-dialog-overlay");
                if (el) el.classList.remove("hidden");
              }}
              variant="outline"
            >
              Info Dialog
            </Button>

            {/* Confirm Dialog */}
            <div
              id="demo-dialog-overlay"
              className="fixed inset-0 z-50 hidden bg-black/50 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  e.currentTarget.classList.add("hidden");
                }
              }}
            >
              <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg sm:rounded-xl">
                <div className="flex flex-col space-y-1.5">
                  <h2 className="text-lg font-semibold leading-none tracking-tight">Confirm Action</h2>
                  <p className="text-sm text-muted-foreground">This action cannot be undone. Are you sure?</p>
                </div>
                <div className="my-4 flex items-center gap-2 rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                  <span>This will permanently remove the selected items.</span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => document.getElementById("demo-dialog-overlay")?.classList.add("hidden")}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => document.getElementById("demo-dialog-overlay")?.classList.add("hidden")}>
                    Confirm
                  </Button>
                </div>
              </div>
            </div>

            {/* Info Dialog */}
            <div
              id="demo-info-dialog-overlay"
              className="fixed inset-0 z-50 hidden bg-black/50 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  e.currentTarget.classList.add("hidden");
                }
              }}
            >
              <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg sm:rounded-xl">
                <div className="flex flex-col space-y-1.5">
                  <h2 className="text-lg font-semibold leading-none tracking-tight">About NGXSMK Wallet</h2>
                  <p className="text-sm text-muted-foreground">Version 1.0.0 — Privacy-first digital identity manager</p>
                </div>
                <div className="my-4 space-y-3 text-sm">
                  <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">End-to-End Encrypted</p>
                      <p className="text-xs text-muted-foreground">Your data never leaves your device</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                    <Key className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Biometric Auth</p>
                      <p className="text-xs text-muted-foreground">Face recognition & passkey support</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => document.getElementById("demo-info-dialog-overlay")?.classList.add("hidden")}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Loading States */}
        <Section title="Loading States" description="Skeletons and progress indicators">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border p-4">
                  <div className="mb-3 h-4 w-24 animate-pulse rounded-md bg-muted/50" />
                  <div className="mb-2 h-8 w-16 animate-pulse rounded-md bg-muted/50" />
                  <div className="h-3 w-32 animate-pulse rounded-md bg-muted/50" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 rounded-xl border p-4">
              <div className="h-10 w-10 animate-pulse rounded-full bg-muted/50" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 animate-pulse rounded-md bg-muted/50" />
                <div className="h-3 w-32 animate-pulse rounded-md bg-muted/50" />
              </div>
            </div>
          </div>
        </Section>

        {/* Status & Alerts */}
        <Section title="Status & Alerts" description="Feedback and notification patterns">
          <div className="space-y-3">
            {[
              { icon: CheckCircle, label: "Success", desc: "Operation completed successfully", color: "text-green-500", bg: "bg-green-500/5 border-green-500/10" },
              { icon: AlertTriangle, label: "Warning", desc: "Your session will expire soon", color: "text-amber-500", bg: "bg-amber-500/5 border-amber-500/10" },
              { icon: XCircle, label: "Error", desc: "Failed to authenticate. Please try again.", color: "text-red-500", bg: "bg-red-500/5 border-red-500/10" },
              { icon: Info, label: "Info", desc: "New update available. Restart to apply.", color: "text-blue-500", bg: "bg-blue-500/5 border-blue-500/10" },
            ].map((alert, i) => {
              const AlertIcon = alert.icon;
              return (
                <div key={i} className={`flex items-start gap-3 rounded-xl border p-4 ${alert.bg}`}>
                  <AlertIcon className={`mt-0.5 h-5 w-5 shrink-0 ${alert.color}`} />
                  <div>
                    <p className="text-sm font-medium">{alert.label}</p>
                    <p className="text-xs text-muted-foreground">{alert.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </motion.div>
    </div>
  );
}
