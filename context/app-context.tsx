"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Platform = "Swiggy" | "Zomato";
export type UserRole = "worker" | "admin";

type UserProfile = {
  name: string;
  platform: Platform;
  dailyIncome: number;
  normalHours: number;
  currentHours: number;
  hasSimulated: boolean;
};

type SessionState = {
  isAuthenticated: boolean;
  role: UserRole | null;
  displayName: string;
  email: string;
};

type ToastState = {
  open: boolean;
  message: string;
};

type RegisterPayload = {
  name: string;
  platform: Platform;
  dailyIncome: number;
  normalHours: number;
};

type WorkerLoginPayload = {
  name: string;
  email: string;
};

type AdminLoginPayload = {
  email: string;
};

type Metrics = {
  lostHours: number;
  hourlyIncome: number;
  loss: number;
  payout: number;
  premium: number;
  coveragePercent: number;
  maxWeeklyCap: number;
  risk: "Low" | "High";
};

type AppContextValue = {
  isHydrated: boolean;
  user: UserProfile;
  session: SessionState;
  metrics: Metrics;
  registerUser: (payload: RegisterPayload) => void;
  loginWorker: (payload: WorkerLoginPayload) => void;
  loginAdmin: (payload: AdminLoginPayload) => void;
  logout: () => void;
  simulateRainEvent: () => void;
  resetSimulation: () => void;
  showToast: (message: string) => void;
  dismissToast: () => void;
  toast: ToastState;
};

const STORAGE_KEY = "hoursafe-ai-state";

const defaultUser: UserProfile = {
  name: "Ravi",
  platform: "Swiggy",
  dailyIncome: 1000,
  normalHours: 10,
  currentHours: 10,
  hasSimulated: false,
};

const defaultSession: SessionState = {
  isAuthenticated: false,
  role: null,
  displayName: "",
  email: "",
};

function deriveMetrics(user: UserProfile): Metrics {
  const safeNormalHours = Math.max(user.normalHours, 1);
  const hourlyIncome = user.dailyIncome / safeNormalHours;
  const lostHours = Math.max(user.normalHours - user.currentHours, 0);
  const loss = lostHours * hourlyIncome;
  const payout = loss * 0.7;
  const premium = 20 + (0.5 * user.dailyIncome) / 100;

  return {
    lostHours,
    hourlyIncome,
    loss,
    payout,
    premium,
    coveragePercent: 70,
    maxWeeklyCap: Math.round(user.dailyIncome * 5 * 0.7),
    risk: user.hasSimulated ? "High" : "Low",
  };
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [session, setSession] = useState<SessionState>(defaultSession);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
  });

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as {
          user?: Partial<UserProfile>;
          session?: Partial<SessionState>;
        };

        setUser({
          ...defaultUser,
          ...parsed.user,
        });

        setSession({
          ...defaultSession,
          ...parsed.session,
        });
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user,
        session,
      }),
    );
  }, [isHydrated, session, user]);

  useEffect(() => {
    if (!toast.open) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setToast((current) => ({ ...current, open: false }));
    }, 3200);

    return () => window.clearTimeout(timeout);
  }, [toast.open]);

  const registerUser = (payload: RegisterPayload) => {
    startTransition(() => {
      setUser({
        name: payload.name,
        platform: payload.platform,
        dailyIncome: payload.dailyIncome,
        normalHours: payload.normalHours,
        currentHours: payload.normalHours,
        hasSimulated: false,
      });
      setSession({
        isAuthenticated: true,
        role: "worker",
        displayName: payload.name,
        email: `${payload.name.toLowerCase()}@hoursafe.demo`,
      });
      setToast({
        open: true,
        message: "Worker profile created successfully",
      });
    });
  };

  const loginWorker = (payload: WorkerLoginPayload) => {
    startTransition(() => {
      setSession({
        isAuthenticated: true,
        role: "worker",
        displayName: payload.name,
        email: payload.email,
      });
      setUser((current) => ({
        ...current,
        name: payload.name,
      }));
      setToast({
        open: true,
        message: "Worker demo login successful",
      });
    });
  };

  const loginAdmin = (payload: AdminLoginPayload) => {
    startTransition(() => {
      setSession({
        isAuthenticated: true,
        role: "admin",
        displayName: "Ops Admin",
        email: payload.email,
      });
      setToast({
        open: true,
        message: "Admin demo login successful",
      });
    });
  };

  const logout = () => {
    startTransition(() => {
      setSession(defaultSession);
      setToast({
        open: true,
        message: "Signed out successfully",
      });
    });
  };

  const simulateRainEvent = () => {
    startTransition(() => {
      setUser((current) => ({
        ...current,
        currentHours: 3,
        hasSimulated: true,
      }));
      setToast({
        open: true,
        message: "Payout credited successfully 💰",
      });
    });
  };

  const resetSimulation = () => {
    startTransition(() => {
      setUser((current) => ({
        ...current,
        currentHours: current.normalHours,
        hasSimulated: false,
      }));
    });
  };

  const showToast = (message: string) => {
    setToast({
      open: true,
      message,
    });
  };

  const dismissToast = () => {
    setToast((current) => ({
      ...current,
      open: false,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        isHydrated,
        user,
        session,
        metrics: deriveMetrics(user),
        registerUser,
        loginWorker,
        loginAdmin,
        logout,
        simulateRainEvent,
        resetSimulation,
        showToast,
        dismissToast,
        toast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
