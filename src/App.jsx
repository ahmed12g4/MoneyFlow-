/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  PiggyBank,
  ShoppingCart,
  Home,
  Zap,
  Coffee,
  Car,
  Heart,
  BookOpen,
  Film,
  Smartphone,
  Menu,
  X,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  User,
  LogOut,
  Moon,
  Sun,
  Globe,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Repeat,
} from "lucide-react";

const SmartFinanceManager = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Financial Data States
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [recurringPayments, setRecurringPayments] = useState([]);

  // Modal States
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddRecurring, setShowAddRecurring] = useState(false);

  // Form States
  const [transactionForm, setTransactionForm] = useState({
    type: "expense",
    amount: "",
    category: "food",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [budgetForm, setBudgetForm] = useState({
    category: "food",
    limit: "",
    period: "monthly",
  });

  const [goalForm, setGoalForm] = useState({
    name: "",
    target: "",
    current: 0,
    deadline: "",
  });

  const [recurringForm, setRecurringForm] = useState({
    name: "",
    amount: "",
    frequency: "monthly",
    category: "bills",
    nextDate: "",
  });

  const [filterPeriod, setFilterPeriod] = useState("month");
  const [filterCategory, setFilterCategory] = useState("all");

  const translations = {
    en: {
      title: "Smart Finance Manager",
      dashboard: "Dashboard",
      transactions: "Transactions",
      budgets: "Budgets",
      goals: "Goals",
      recurring: "Recurring",
      analytics: "Analytics",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      name: "Name",
      email: "Email",
      password: "Password",
      totalBalance: "Total Balance",
      income: "Income",
      expenses: "Expenses",
      savings: "Savings",
      addTransaction: "Add Transaction",
      addBudget: "Add Budget",
      addGoal: "Add Goal",
      addRecurring: "Add Recurring",
      amount: "Amount",
      category: "Category",
      description: "Description",
      date: "Date",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      search: "Search...",
      filter: "Filter",
      export: "Export",
      import: "Import",
      noData: "No data yet",
      startAdding: "Start adding your transactions!",
      thisMonth: "This Month",
      thisWeek: "This Week",
      today: "Today",
      all: "All",
      food: "Food",
      transport: "Transport",
      shopping: "Shopping",
      bills: "Bills",
      entertainment: "Entertainment",
      health: "Health",
      education: "Education",
      other: "Other",
      monthly: "Monthly",
      weekly: "Weekly",
      daily: "Daily",
      yearly: "Yearly",
      spendingByCategory: "Spending by Category",
      incomeVsExpenses: "Income vs Expenses",
      budgetProgress: "Budget Progress",
      goalProgress: "Goal Progress",
      recentTransactions: "Recent Transactions",
      upcomingPayments: "Upcoming Payments",
      target: "Target",
      current: "Current",
      remaining: "Remaining",
      frequency: "Frequency",
      nextPayment: "Next Payment",
      deadline: "Deadline",
      limit: "Limit",
      spent: "Spent",
      period: "Period",
    },
    ar: {
      title: "إدارة مالية ذكية",
      dashboard: "لوحة التحكم",
      transactions: "المعاملات",
      budgets: "الميزانيات",
      goals: "الأهداف",
      recurring: "المدفوعات المتكررة",
      analytics: "التحليلات",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      logout: "تسجيل الخروج",
      name: "الاسم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      totalBalance: "الرصيد الكلي",
      income: "الدخل",
      expenses: "المصروفات",
      savings: "المدخرات",
      addTransaction: "إضافة معاملة",
      addBudget: "إضافة ميزانية",
      addGoal: "إضافة هدف",
      addRecurring: "إضافة متكرر",
      amount: "المبلغ",
      category: "الفئة",
      description: "الوصف",
      date: "التاريخ",
      save: "حفظ",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      search: "بحث...",
      filter: "تصفية",
      export: "تصدير",
      import: "استيراد",
      noData: "لا توجد بيانات بعد",
      startAdding: "ابدأ بإضافة معاملاتك!",
      thisMonth: "هذا الشهر",
      thisWeek: "هذا الأسبوع",
      today: "اليوم",
      all: "الكل",
      food: "طعام",
      transport: "مواصلات",
      shopping: "تسوق",
      bills: "فواتير",
      entertainment: "ترفيه",
      health: "صحة",
      education: "تعليم",
      other: "أخرى",
      monthly: "شهري",
      weekly: "أسبوعي",
      daily: "يومي",
      yearly: "سنوي",
      spendingByCategory: "الإنفاق حسب الفئة",
      incomeVsExpenses: "الدخل مقابل المصروفات",
      budgetProgress: "تقدم الميزانية",
      goalProgress: "تقدم الهدف",
      recentTransactions: "المعاملات الأخيرة",
      upcomingPayments: "المدفوعات القادمة",
      target: "الهدف",
      current: "الحالي",
      remaining: "المتبقي",
      frequency: "التكرار",
      nextPayment: "الدفعة القادمة",
      deadline: "الموعد النهائي",
      limit: "الحد",
      spent: "المنفق",
      period: "الفترة",
    },
  };

  const t = translations[language];
  const isRTL = language === "ar";

  const currencies = {
    USD: { symbol: "$", name: "US Dollar" },
    EUR: { symbol: "€", name: "Euro" },
    GBP: { symbol: "£", name: "British Pound" },
    EGP: { symbol: "ج.م", name: "Egyptian Pound" },
    SAR: { symbol: "ر.س", name: "Saudi Riyal" },
    AED: { symbol: "د.إ", name: "UAE Dirham" },
  };

  const categories = {
    food: { icon: Coffee, color: "#FF6B6B", name: t.food },
    transport: { icon: Car, color: "#4ECDC4", name: t.transport },
    shopping: { icon: ShoppingCart, color: "#45B7D1", name: t.shopping },
    bills: { icon: Home, color: "#FFA07A", name: t.bills },
    entertainment: { icon: Film, color: "#98D8C8", name: t.entertainment },
    health: { icon: Heart, color: "#F7DC6F", name: t.health },
    education: { icon: BookOpen, color: "#BB8FCE", name: t.education },
    other: { icon: Smartphone, color: "#85C1E2", name: t.other },
  };

  // Load user data on mount
  useEffect(() => {
    const user = localStorage.getItem("currentFinanceUser");
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      loadUserData(userData.email);
    }

    // Set dark mode based on system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (currentUser) {
      saveUserData();
    }
  }, [transactions, budgets, goals, recurringPayments]);

  const loadUserData = (email) => {
    const data = localStorage.getItem(`financeData_${email}`);
    if (data) {
      const parsed = JSON.parse(data);
      setTransactions(parsed.transactions || []);
      setBudgets(parsed.budgets || []);
      setGoals(parsed.goals || []);
      setRecurringPayments(parsed.recurring || []);
    }
  };

  const saveUserData = () => {
    if (currentUser) {
      const data = {
        transactions,
        budgets,
        goals,
        recurring: recurringPayments,
      };
      localStorage.setItem(
        `financeData_${currentUser.email}`,
        JSON.stringify(data)
      );
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAuth = () => {
    if (!validateEmail(authForm.email)) {
      alert(
        language === "en"
          ? "Please enter a valid email"
          : "يرجى إدخال بريد إلكتروني صحيح"
      );
      return;
    }
    if (authForm.password.length < 6) {
      alert(
        language === "en"
          ? "Password must be at least 6 characters"
          : "يجب أن تكون كلمة المرور 6 أحرف على الأقل"
      );
      return;
    }

    if (authMode === "signup" && !authForm.name.trim()) {
      alert(language === "en" ? "Please enter your name" : "يرجى إدخال اسمك");
      return;
    }

    const users = JSON.parse(localStorage.getItem("financeUsers") || "[]");

    if (authMode === "signup") {
      const exists = users.find((u) => u.email === authForm.email);
      if (exists) {
        alert(
          language === "en"
            ? "Email already registered"
            : "البريد الإلكتروني مسجل بالفعل"
        );
        return;
      }
      const encrypted = btoa(authForm.password);
      users.push({
        name: authForm.name,
        email: authForm.email,
        password: encrypted,
      });
      localStorage.setItem("financeUsers", JSON.stringify(users));
    } else {
      const user = users.find((u) => u.email === authForm.email);
      if (!user || atob(user.password) !== authForm.password) {
        alert(language === "en" ? "Invalid credentials" : "بيانات غير صحيحة");
        return;
      }
    }

    const user = {
      name: authForm.name || authForm.email.split("@")[0],
      email: authForm.email,
    };
    setCurrentUser(user);
    localStorage.setItem("currentFinanceUser", JSON.stringify(user));
    loadUserData(user.email);
    setShowAuthModal(false);
    setAuthForm({ name: "", email: "", password: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentFinanceUser");
    setCurrentUser(null);
    setTransactions([]);
    setBudgets([]);
    setGoals([]);
    setRecurringPayments([]);
  };

  const handleAddTransaction = () => {
    if (!transactionForm.amount || parseFloat(transactionForm.amount) <= 0) {
      alert(
        language === "en"
          ? "Please enter a valid amount"
          : "يرجى إدخال مبلغ صحيح"
      );
      return;
    }

    const newTransaction = {
      id: Date.now(),
      ...transactionForm,
      amount: parseFloat(transactionForm.amount),
      timestamp: new Date().toISOString(),
    };

    setTransactions([newTransaction, ...transactions]);
    setTransactionForm({
      type: "expense",
      amount: "",
      category: "food",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setShowAddTransaction(false);
  };

  const handleAddBudget = () => {
    if (!budgetForm.limit || parseFloat(budgetForm.limit) <= 0) {
      alert(
        language === "en" ? "Please enter a valid limit" : "يرجى إدخال حد صحيح"
      );
      return;
    }

    const exists = budgets.find(
      (b) =>
        b.category === budgetForm.category && b.period === budgetForm.period
    );
    if (exists) {
      alert(
        language === "en"
          ? "Budget already exists for this category"
          : "الميزانية موجودة بالفعل لهذه الفئة"
      );
      return;
    }

    const newBudget = {
      id: Date.now(),
      ...budgetForm,
      limit: parseFloat(budgetForm.limit),
    };

    setBudgets([...budgets, newBudget]);
    setBudgetForm({ category: "food", limit: "", period: "monthly" });
    setShowAddBudget(false);
  };

  const handleAddGoal = () => {
    if (
      !goalForm.name.trim() ||
      !goalForm.target ||
      parseFloat(goalForm.target) <= 0
    ) {
      alert(
        language === "en" ? "Please fill all fields" : "يرجى ملء جميع الحقول"
      );
      return;
    }

    const newGoal = {
      id: Date.now(),
      ...goalForm,
      target: parseFloat(goalForm.target),
      current: 0,
    };

    setGoals([...goals, newGoal]);
    setGoalForm({ name: "", target: "", current: 0, deadline: "" });
    setShowAddGoal(false);
  };

  const handleAddRecurring = () => {
    if (
      !recurringForm.name.trim() ||
      !recurringForm.amount ||
      parseFloat(recurringForm.amount) <= 0
    ) {
      alert(
        language === "en" ? "Please fill all fields" : "يرجى ملء جميع الحقول"
      );
      return;
    }

    const newRecurring = {
      id: Date.now(),
      ...recurringForm,
      amount: parseFloat(recurringForm.amount),
    };

    setRecurringPayments([...recurringPayments, newRecurring]);
    setRecurringForm({
      name: "",
      amount: "",
      frequency: "monthly",
      category: "bills",
      nextDate: "",
    });
    setShowAddRecurring(false);
  };

  const deleteTransaction = (id) => {
    if (
      window.confirm(
        language === "en" ? "Delete this transaction?" : "حذف هذه المعاملة؟"
      )
    ) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const deleteBudget = (id) => {
    if (
      window.confirm(
        language === "en" ? "Delete this budget?" : "حذف هذه الميزانية؟"
      )
    ) {
      setBudgets(budgets.filter((b) => b.id !== id));
    }
  };

  const deleteGoal = (id) => {
    if (
      window.confirm(language === "en" ? "Delete this goal?" : "حذف هذا الهدف؟")
    ) {
      setGoals(goals.filter((g) => g.id !== id));
    }
  };

  const deleteRecurring = (id) => {
    if (
      window.confirm(
        language === "en"
          ? "Delete this recurring payment?"
          : "حذف هذا الدفع المتكرر؟"
      )
    ) {
      setRecurringPayments(recurringPayments.filter((r) => r.id !== id));
    }
  };

  const addToGoal = (id, amount) => {
    setGoals(
      goals.map((g) => {
        if (g.id === id) {
          return { ...g, current: Math.min(g.current + amount, g.target) };
        }
        return g;
      })
    );
  };

  // Calculate statistics
  const calculateStats = () => {
    const now = new Date();
    let filtered = transactions;

    if (filterPeriod === "today") {
      filtered = transactions.filter((t) => {
        const tDate = new Date(t.date);
        return tDate.toDateString() === now.toDateString();
      });
    } else if (filterPeriod === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = transactions.filter((t) => new Date(t.date) >= weekAgo);
    } else if (filterPeriod === "month") {
      filtered = transactions.filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getMonth() === now.getMonth() &&
          tDate.getFullYear() === now.getFullYear()
        );
      });
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((t) => t.category === filterCategory);
    }

    const income = filtered
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = filtered
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;

    return { income, expenses, balance, filtered };
  };

  const stats = calculateStats();

  // Chart data
  const getCategoryData = () => {
    const categoryTotals = {};
    stats.filtered
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + t.amount;
      });

    return Object.entries(categoryTotals).map(([cat, value]) => ({
      name: categories[cat]?.name || cat,
      value,
      color: categories[cat]?.color || "#999",
    }));
  };

  const getTimelineData = () => {
    const last7Days = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split("T")[0];
      const dayName = date.toLocaleDateString("en", { weekday: "short" });

      const dayIncome = transactions
        .filter((t) => t.type === "income" && t.date === dateStr)
        .reduce((sum, t) => sum + t.amount, 0);
      const dayExpenses = transactions
        .filter((t) => t.type === "expense" && t.date === dateStr)
        .reduce((sum, t) => sum + t.amount, 0);

      last7Days.push({
        day: dayName,
        income: dayIncome,
        expenses: dayExpenses,
      });
    }

    return last7Days;
  };

  const getBudgetProgress = () => {
    return budgets.map((budget) => {
      const spent = transactions
        .filter((t) => t.type === "expense" && t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);

      const percentage = (spent / budget.limit) * 100;

      return {
        ...budget,
        spent,
        percentage: Math.min(percentage, 100),
        status:
          percentage > 100 ? "over" : percentage > 80 ? "warning" : "good",
      };
    });
  };

  const exportData = () => {
    const data = {
      transactions,
      budgets,
      goals,
      recurring: recurringPayments,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `finance-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (
          window.confirm(
            language === "en"
              ? "This will replace all your data. Continue?"
              : "سيتم استبدال جميع بياناتك. المتابعة؟"
          )
        ) {
          setTransactions(data.transactions || []);
          setBudgets(data.budgets || []);
          setGoals(data.goals || []);
          setRecurringPayments(data.recurring || []);
          alert(
            language === "en"
              ? "Data imported successfully!"
              : "تم استيراد البيانات بنجاح!"
          );
        }
      } catch (error) {
        alert(language === "en" ? "Invalid file format" : "صيغة ملف غير صحيحة");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"
      } ${isRTL ? "rtl" : "ltr"} transition-all duration-300`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode ? "bg-gray-800/95" : "bg-white/95"
        } backdrop-blur-xl border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        } sticky top-0 z-40 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo & Menu */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`lg:hidden p-1.5 sm:p-2 rounded-xl ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-indigo-50"
                } transition-all`}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Wallet className="text-white" size={18} />
                </div>
                <div className="hidden sm:block">
                  <h1
                    className={`text-base sm:text-lg font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Currency Selector - Desktop Only */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`hidden md:block px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none cursor-pointer hover:scale-105 transition-all text-xs sm:text-sm font-medium`}
              >
                {Object.entries(currencies).map(([code, { symbol }]) => (
                  <option key={code} value={code}>
                    {symbol} {code}
                  </option>
                ))}
              </select>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                className={`p-1.5 sm:p-2 rounded-xl ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-indigo-50"
                } transition-all hover:scale-110`}
                title={language === "en" ? "العربية" : "English"}
              >
                <Globe size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-1.5 sm:p-2 rounded-xl ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-indigo-50"
                } transition-all hover:scale-110`}
              >
                {darkMode ? (
                  <Sun size={18} className="sm:w-5 sm:h-5" />
                ) : (
                  <Moon size={18} className="sm:w-5 sm:h-5" />
                )}
              </button>

              {/* Auth Buttons */}
              {!currentUser ? (
                <div className="flex gap-1 sm:gap-2">
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setShowAuthModal(true);
                    }}
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    } font-medium transition-all hover:scale-105`}
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("signup");
                      setShowAuthModal(true);
                    }}
                    className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    {t.signup}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* User Avatar - Mobile Shows Only Avatar */}
                  <div
                    className={`flex items-center gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl ${
                      darkMode ? "bg-gray-700" : "bg-indigo-50"
                    }`}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                      {currentUser.name[0].toUpperCase()}
                    </div>
                    <span
                      className={`hidden md:inline text-xs sm:text-sm font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {currentUser.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`p-1.5 sm:p-2 rounded-xl ${
                      darkMode
                        ? "hover:bg-gray-700 text-red-400"
                        : "hover:bg-red-50 text-red-600"
                    } transition-all hover:scale-110`}
                    title={t.logout}
                  >
                    <LogOut size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-3xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-500`}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 mb-4 shadow-lg">
                <Wallet size={32} className="text-white" />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                } mb-2`}
              >
                {authMode === "login" ? t.login : t.signup}
              </h2>
            </div>

            <div className="space-y-4">
              {authMode === "signup" && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.name}
                    value={authForm.name}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-indigo-50 text-gray-900 border-gray-200"
                    } border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all`}
                  />
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  placeholder={t.email}
                  value={authForm.email}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-indigo-50 text-gray-900 border-gray-200"
                  } border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all`}
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t.password}
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, password: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-indigo-50 text-gray-900 border-gray-200"
                  } border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all`}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                onClick={handleAuth}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                {authMode === "login" ? t.login : t.signup}
              </button>

              <div className="text-center">
                <button
                  onClick={() =>
                    setAuthMode(authMode === "login" ? "signup" : "login")
                  }
                  className={`${
                    darkMode
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-indigo-600 hover:text-indigo-700"
                  } font-medium transition-colors`}
                >
                  {authMode === "login" ? t.signup : t.login}
                </button>
              </div>

              <button
                onClick={() => setShowAuthModal(false)}
                className={`w-full py-2 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-700"
                } font-medium hover:scale-105 transition-all`}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <div
            className={`lg:hidden fixed ${
              isRTL ? "right-0" : "left-0"
            } top-0 h-full w-72 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-2xl z-50 transform transition-transform duration-300`}
          >
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.title}
                </h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>
              {[
                "dashboard",
                "transactions",
                "budgets",
                "goals",
                "recurring",
                "analytics",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg"
                      : darkMode
                      ? "hover:bg-gray-700 text-gray-400"
                      : "hover:bg-indigo-50 text-gray-600"
                  } transition-all font-medium`}
                >
                  {tab === "dashboard" && <Home size={20} />}
                  {tab === "transactions" && <CreditCard size={20} />}
                  {tab === "budgets" && <PiggyBank size={20} />}
                  {tab === "goals" && <Target size={20} />}
                  {tab === "recurring" && <Repeat size={20} />}
                  {tab === "analytics" && <TrendingUp size={20} />}
                  {t[tab]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      {!currentUser ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 mb-6 shadow-2xl animate-bounce">
              <Wallet size={48} className="text-white" />
            </div>
            <h2
              className={`text-3xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {language === "en"
                ? "Welcome to Smart Finance Manager"
                : "مرحباً بك في إدارة مالية ذكية"}
            </h2>
            <p
              className={`text-lg mb-8 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {language === "en"
                ? "Track your income, expenses, budgets and financial goals all in one place."
                : "تتبع دخلك ومصروفاتك وميزانياتك وأهدافك المالية في مكان واحد."}
            </p>
            <button
              onClick={() => {
                setAuthMode("signup");
                setShowAuthModal(true);
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-110 transition-all"
            >
              {t.signup}
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div
            className={`flex gap-2 mb-8 overflow-x-auto pb-2 ${
              darkMode ? "scrollbar-dark" : "scrollbar-light"
            }`}
          >
            {[
              "dashboard",
              "transactions",
              "budgets",
              "goals",
              "recurring",
              "analytics",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg"
                    : darkMode
                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    : "bg-white text-gray-600 hover:bg-indigo-50"
                } font-medium transition-all hover:scale-105`}
              >
                {tab === "dashboard" && <Home size={18} />}
                {tab === "transactions" && <CreditCard size={18} />}
                {tab === "budgets" && <PiggyBank size={18} />}
                {tab === "goals" && <Target size={18} />}
                {tab === "recurring" && <Repeat size={18} />}
                {tab === "analytics" && <TrendingUp size={18} />}
                {t[tab]}
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  className={`${
                    darkMode ? "bg-gray-800/80" : "bg-white/80"
                  } backdrop-blur-xl rounded-2xl p-6 border ${
                    darkMode ? "border-gray-700" : "border-white/20"
                  } shadow-xl hover:scale-105 transition-all group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                      <Wallet size={24} />
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        stats.balance >= 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {filterPeriod === "today"
                        ? t.today
                        : filterPeriod === "week"
                        ? t.thisWeek
                        : t.thisMonth}
                    </span>
                  </div>
                  <p
                    className={`text-3xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    } mb-1`}
                  >
                    {currencies[currency].symbol}
                    {stats.balance.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t.totalBalance}
                  </p>
                </div>

                <div
                  className={`${
                    darkMode ? "bg-gray-800/80" : "bg-white/80"
                  } backdrop-blur-xl rounded-2xl p-6 border ${
                    darkMode ? "border-gray-700" : "border-white/20"
                  } shadow-xl hover:scale-105 transition-all group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                      <TrendingUp size={24} />
                    </div>
                    <ArrowUpRight className="text-green-500" size={20} />
                  </div>
                  <p
                    className={`text-3xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    } mb-1`}
                  >
                    {currencies[currency].symbol}
                    {stats.income.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t.income}
                  </p>
                </div>

                <div
                  className={`${
                    darkMode ? "bg-gray-800/80" : "bg-white/80"
                  } backdrop-blur-xl rounded-2xl p-6 border ${
                    darkMode ? "border-gray-700" : "border-white/20"
                  } shadow-xl hover:scale-105 transition-all group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                      <TrendingDown size={24} />
                    </div>
                    <ArrowDownRight className="text-red-500" size={20} />
                  </div>
                  <p
                    className={`text-3xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    } mb-1`}
                  >
                    {currencies[currency].symbol}
                    {stats.expenses.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t.expenses}
                  </p>
                </div>

                <div
                  className={`${
                    darkMode ? "bg-gray-800/80" : "bg-white/80"
                  } backdrop-blur-xl rounded-2xl p-6 border ${
                    darkMode ? "border-gray-700" : "border-white/20"
                  } shadow-xl hover:scale-105 transition-all group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                      <PiggyBank size={24} />
                    </div>
                    <Target className="text-purple-500" size={20} />
                  </div>
                  <p
                    className={`text-3xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    } mb-1`}
                  >
                    {goals.length}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t.goals}
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className={`px-4 py-2 rounded-xl ${
                    darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-900"
                  } border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } outline-none cursor-pointer hover:scale-105 transition-all`}
                >
                  <option value="today">{t.today}</option>
                  <option value="week">{t.thisWeek}</option>
                  <option value="month">{t.thisMonth}</option>
                  <option value="all">{t.all}</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className={`px-4 py-2 rounded-xl ${
                    darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-900"
                  } border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } outline-none cursor-pointer hover:scale-105 transition-all`}
                >
                  <option value="all">{t.all}</option>
                  {Object.entries(categories).map(([key, cat]) => (
                    <option key={key} value={key}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={exportData}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                    darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-900"
                  } border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } hover:scale-105 transition-all`}
                >
                  <Download size={18} />
                  {t.export}
                </button>

                <label
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                    darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-900"
                  } border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } hover:scale-105 transition-all cursor-pointer`}
                >
                  <Upload size={18} />
                  {t.import}
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Income vs Expenses Chart */}
                <div
                  className={`${
                    darkMode ? "bg-gray-800/80" : "bg-white/80"
                  } backdrop-blur-xl rounded-2xl p-6 border ${
                    darkMode ? "border-gray-700" : "border-white/20"
                  } shadow-xl`}
                >
                  <h3
                    className={`text-xl font-bold mb-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.incomeVsExpenses}
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={getTimelineData()}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? "#374151" : "#e5e7eb"}
                      />
                      <XAxis
                        dataKey="day"
                        stroke={darkMode ? "#9ca3af" : "#6b7280"}
                      />
                      <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#1f2937" : "#fff",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#10b981"
                        fill="url(#incomeGradient)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#ef4444"
                        fill="url(#expenseGradient)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient
                          id="incomeGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#10b981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="expenseGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#ef4444"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="#ef4444"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Spending Chart */}
                <div
                  className={`${
                    darkMode ? "bg-gray-800/80" : "bg-white/80"
                  } backdrop-blur-xl rounded-2xl p-6 border ${
                    darkMode ? "border-gray-700" : "border-white/20"
                  } shadow-xl`}
                >
                  <h3
                    className={`text-xl font-bold mb-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.spendingByCategory}
                  </h3>
                  {getCategoryData().length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={getCategoryData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label={(entry) =>
                            `${entry.name}: ${
                              currencies[currency].symbol
                            }${entry.value.toFixed(0)}`
                          }
                        >
                          {getCategoryData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: darkMode ? "#1f2937" : "#fff",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-gray-400">
                      {t.noData}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Transactions */}
              <div
                className={`${
                  darkMode ? "bg-gray-800/80" : "bg-white/80"
                } backdrop-blur-xl rounded-2xl p-6 border ${
                  darkMode ? "border-gray-700" : "border-white/20"
                } shadow-xl`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.recentTransactions}
                  </h3>
                  <button
                    onClick={() => setShowAddTransaction(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-lg hover:scale-105 transition-all"
                  >
                    <Plus size={18} />
                    {t.addTransaction}
                  </button>
                </div>

                {transactions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 mb-4">
                      <CreditCard size={32} className="text-indigo-500" />
                    </div>
                    <h3
                      className={`text-lg font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t.noData}
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4`}
                    >
                      {t.startAdding}
                    </p>
                    <button
                      onClick={() => setShowAddTransaction(true)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
                    >
                      <Plus size={18} />
                      {t.addTransaction}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => {
                      const CategoryIcon =
                        categories[transaction.category]?.icon || Smartphone;
                      const categoryColor =
                        categories[transaction.category]?.color || "#999";
                      return (
                        <div
                          key={transaction.id}
                          className={`flex items-center gap-4 p-4 rounded-xl ${
                            darkMode
                              ? "bg-gray-700/50 hover:bg-gray-700"
                              : "bg-gray-50 hover:bg-gray-100"
                          } transition-all cursor-pointer group`}
                        >
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: categoryColor + "20" }}
                          >
                            <CategoryIcon
                              size={24}
                              style={{ color: categoryColor }}
                            />
                          </div>
                          <div className="flex-1">
                            <p
                              className={`font-semibold ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {transaction.description ||
                                categories[transaction.category]?.name}
                            </p>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {transaction.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-lg font-bold ${
                                transaction.type === "income"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {transaction.type === "income" ? "+" : "-"}
                              {currencies[currency].symbol}
                              {transaction.amount.toFixed(2)}
                            </p>
                            <p
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {categories[transaction.category]?.name}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteTransaction(transaction.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-all"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.transactions}
                </h2>
                <button
                  onClick={() => setShowAddTransaction(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-lg hover:scale-105 transition-all"
                >
                  <Plus size={20} />
                  {t.addTransaction}
                </button>
              </div>

              <div
                className={`${
                  darkMode ? "bg-gray-800/80" : "bg-white/80"
                } backdrop-blur-xl rounded-2xl p-6 border ${
                  darkMode ? "border-gray-700" : "border-white/20"
                } shadow-xl`}
              >
                {transactions.length === 0 ? (
                  <div className="text-center py-20">
                    <CreditCard
                      size={64}
                      className="mx-auto mb-4 text-indigo-500 opacity-50"
                    />
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t.noData}
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {t.startAdding}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((transaction) => {
                      const CategoryIcon =
                        categories[transaction.category]?.icon || Smartphone;
                      const categoryColor =
                        categories[transaction.category]?.color || "#999";
                      return (
                        <div
                          key={transaction.id}
                          className={`flex items-center gap-4 p-4 rounded-xl ${
                            darkMode
                              ? "bg-gray-700/50 hover:bg-gray-700"
                              : "bg-gray-50 hover:bg-gray-100"
                          } transition-all group`}
                        >
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: categoryColor + "20" }}
                          >
                            <CategoryIcon
                              size={28}
                              style={{ color: categoryColor }}
                            />
                          </div>
                          <div className="flex-1">
                            <p
                              className={`font-bold text-lg ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {transaction.description ||
                                categories[transaction.category]?.name}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <p
                                className={`text-sm ${
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                <Calendar size={14} className="inline mr-1" />
                                {transaction.date}
                              </p>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  transaction.type === "income"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {transaction.type}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-2xl font-bold ${
                                transaction.type === "income"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {transaction.type === "income" ? "+" : "-"}
                              {currencies[currency].symbol}
                              {transaction.amount.toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteTransaction(transaction.id)}
                            className="opacity-0 group-hover:opacity-100 p-3 hover:bg-red-500/20 rounded-xl text-red-500 transition-all"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Budgets Tab */}
          {activeTab === "budgets" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.budgets}
                </h2>
                <button
                  onClick={() => setShowAddBudget(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-lg hover:scale-105 transition-all"
                >
                  <Plus size={20} />
                  {t.addBudget}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgets.length === 0 ? (
                  <div
                    className={`col-span-full ${
                      darkMode ? "bg-gray-800/80" : "bg-white/80"
                    } backdrop-blur-xl rounded-2xl p-20 text-center border ${
                      darkMode ? "border-gray-700" : "border-white/20"
                    } shadow-xl`}
                  >
                    <PiggyBank
                      size={64}
                      className="mx-auto mb-4 text-indigo-500 opacity-50"
                    />
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t.noData}
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mb-6`}
                    >
                      {language === "en"
                        ? "Create budgets to track your spending"
                        : "أنشئ ميزانيات لتتبع إنفاقك"}
                    </p>
                    <button
                      onClick={() => setShowAddBudget(true)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
                    >
                      <Plus size={18} />
                      {t.addBudget}
                    </button>
                  </div>
                ) : (
                  getBudgetProgress().map((budget) => {
                    const CategoryIcon =
                      categories[budget.category]?.icon || Smartphone;
                    const categoryColor =
                      categories[budget.category]?.color || "#999";
                    return (
                      <div
                        key={budget.id}
                        className={`${
                          darkMode ? "bg-gray-800/80" : "bg-white/80"
                        } backdrop-blur-xl rounded-2xl p-6 border ${
                          darkMode ? "border-gray-700" : "border-white/20"
                        } shadow-xl hover:scale-105 transition-all group`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: categoryColor + "20" }}
                            >
                              <CategoryIcon
                                size={24}
                                style={{ color: categoryColor }}
                              />
                            </div>
                            <div>
                              <h3
                                className={`font-bold ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {categories[budget.category]?.name}
                              </h3>
                              <p
                                className={`text-sm ${
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {budget.period === "monthly"
                                  ? t.monthly
                                  : budget.period === "weekly"
                                  ? t.weekly
                                  : t.yearly}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteBudget(budget.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-all"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span
                              className={
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              {t.spent}
                            </span>
                            <span
                              className={`font-bold ${
                                budget.status === "over"
                                  ? "text-red-500"
                                  : budget.status === "warning"
                                  ? "text-orange-500"
                                  : "text-green-500"
                              }`}
                            >
                              {currencies[currency].symbol}
                              {budget.spent.toFixed(2)} /{" "}
                              {currencies[currency].symbol}
                              {budget.limit.toFixed(2)}
                            </span>
                          </div>

                          <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                                budget.status === "over"
                                  ? "bg-red-500"
                                  : budget.status === "warning"
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${budget.percentage}%` }}
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <span
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {budget.percentage.toFixed(1)}%{" "}
                              {language === "en" ? "used" : "مستخدم"}
                            </span>
                            {budget.status === "over" ? (
                              <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                                <AlertCircle size={14} />
                                {language === "en"
                                  ? "Over budget!"
                                  : "تجاوزت الميزانية!"}
                              </span>
                            ) : budget.status === "warning" ? (
                              <span className="text-xs text-orange-500 font-semibold flex items-center gap-1">
                                <AlertCircle size={14} />
                                {language === "en"
                                  ? "Near limit"
                                  : "قريب من الحد"}
                              </span>
                            ) : (
                              <span className="text-xs text-green-500 font-semibold flex items-center gap-1">
                                <CheckCircle size={14} />
                                {language === "en"
                                  ? "On track"
                                  : "على المسار الصحيح"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === "goals" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.goals}
                </h2>
                <button
                  onClick={() => setShowAddGoal(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-lg hover:scale-105 transition-all"
                >
                  <Plus size={20} />
                  {t.addGoal}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.length === 0 ? (
                  <div
                    className={`col-span-full ${
                      darkMode ? "bg-gray-800/80" : "bg-white/80"
                    } backdrop-blur-xl rounded-2xl p-20 text-center border ${
                      darkMode ? "border-gray-700" : "border-white/20"
                    } shadow-xl`}
                  >
                    <Target
                      size={64}
                      className="mx-auto mb-4 text-indigo-500 opacity-50"
                    />
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t.noData}
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mb-6`}
                    >
                      {language === "en"
                        ? "Set financial goals and track your progress"
                        : "حدد أهدافك المالية وتتبع تقدمك"}
                    </p>
                    <button
                      onClick={() => setShowAddGoal(true)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
                    >
                      <Plus size={18} />
                      {t.addGoal}
                    </button>
                  </div>
                ) : (
                  goals.map((goal) => {
                    const percentage = (goal.current / goal.target) * 100;
                    const isComplete = percentage >= 100;
                    return (
                      <div
                        key={goal.id}
                        className={`${
                          darkMode ? "bg-gray-800/80" : "bg-white/80"
                        } backdrop-blur-xl rounded-2xl p-6 border ${
                          darkMode ? "border-gray-700" : "border-white/20"
                        } shadow-xl hover:scale-105 transition-all group`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 rounded-xl ${
                                isComplete ? "bg-green-500" : "bg-indigo-500"
                              } flex items-center justify-center text-white shadow-lg`}
                            >
                              {isComplete ? (
                                <CheckCircle size={24} />
                              ) : (
                                <Target size={24} />
                              )}
                            </div>
                            <div>
                              <h3
                                className={`font-bold ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {goal.name}
                              </h3>
                              {goal.deadline && (
                                <p
                                  className={`text-sm ${
                                    darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  <Clock size={14} className="inline mr-1" />
                                  {goal.deadline}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-all"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span
                              className={
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              {t.current}
                            </span>
                            <span
                              className={`font-bold ${
                                isComplete
                                  ? "text-green-500"
                                  : "text-indigo-500"
                              }`}
                            >
                              {currencies[currency].symbol}
                              {goal.current.toFixed(2)} /{" "}
                              {currencies[currency].symbol}
                              {goal.target.toFixed(2)}
                            </span>
                          </div>

                          <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                                isComplete ? "bg-green-500" : "bg-indigo-500"
                              }`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <span
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {percentage.toFixed(1)}%{" "}
                              {language === "en" ? "complete" : "مكتمل"}
                            </span>
                            <span
                              className={`text-xs font-semibold ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {t.remaining}: {currencies[currency].symbol}
                              {(goal.target - goal.current).toFixed(2)}
                            </span>
                          </div>

                          {!isComplete && (
                            <div className="flex gap-2 mt-4">
                              <input
                                type="number"
                                placeholder="0.00"
                                className={`flex-1 px-3 py-2 rounded-lg ${
                                  darkMode
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-100 text-gray-900"
                                } border-none outline-none`}
                                id={`goal-amount-${goal.id}`}
                              />
                              <button
                                onClick={() => {
                                  const input = document.getElementById(
                                    `goal-amount-${goal.id}`
                                  );
                                  const amount = parseFloat(input.value);
                                  if (amount > 0) {
                                    addToGoal(goal.id, amount);
                                    input.value = "";
                                  }
                                }}
                                className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-all"
                              >
                                {language === "en" ? "Add" : "إضافة"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Recurring Tab */}
          {activeTab === "recurring" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.recurring}
                </h2>
                <button
                  onClick={() => setShowAddRecurring(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-lg hover:scale-105 transition-all"
                >
                  <Plus size={20} />
                  {t.addRecurring}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recurringPayments.length === 0 ? (
                  <div
                    className={`col-span-full ${
                      darkMode ? "bg-gray-800/80" : "bg-white/80"
                    } backdrop-blur-xl rounded-2xl p-20 text-center border ${
                      darkMode ? "border-gray-700" : "border-white/20"
                    } shadow-xl`}
                  >
                    <Repeat
                      size={64}
                      className="mx-auto mb-4 text-indigo-500 opacity-50"
                    />
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t.noData}
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mb-6`}
                    >
                      {language === "en"
                        ? "Track recurring payments and subscriptions"
                        : "تتبع المدفوعات والاشتراكات المتكررة"}
                    </p>
                    <button
                      onClick={() => setShowAddRecurring(true)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
                    >
                      <Plus size={18} />
                      {t.addRecurring}
                    </button>
                  </div>
                ) : (
                  recurringPayments.map((payment) => {
                    const CategoryIcon =
                      categories[payment.category]?.icon || Smartphone;
                    const categoryColor =
                      categories[payment.category]?.color || "#999";
                    return (
                      <div
                        key={payment.id}
                        className={`${
                          darkMode ? "bg-gray-800/80" : "bg-white/80"
                        } backdrop-blur-xl rounded-2xl p-6 border ${
                          darkMode ? "border-gray-700" : "border-white/20"
                        } shadow-xl hover:scale-105 transition-all group`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: categoryColor + "20" }}
                          >
                            <CategoryIcon
                              size={24}
                              style={{ color: categoryColor }}
                            />
                          </div>
                          <button
                            onClick={() => deleteRecurring(payment.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-all"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <h3
                          className={`font-bold text-lg mb-2 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {payment.name}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between items-center">
                            <span
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {t.amount}
                            </span>
                            <span
                              className={`text-xl font-bold ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {currencies[currency].symbol}
                              {payment.amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {t.frequency}
                            </span>
                            <span
                              className={`text-sm px-3 py-1 rounded-full ${
                                darkMode
                                  ? "bg-indigo-500/20 text-indigo-400"
                                  : "bg-indigo-100 text-indigo-700"
                              }`}
                            >
                              {payment.frequency === "monthly"
                                ? t.monthly
                                : payment.frequency === "weekly"
                                ? t.weekly
                                : t.yearly}
                            </span>
                          </div>
                          {payment.nextDate && (
                            <div className="flex justify-between items-center">
                              <span
                                className={`text-sm ${
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {t.nextPayment}
                              </span>
                              <span
                                className={`text-sm ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {payment.nextDate}
                              </span>
                            </div>
                          )}
                        </div>

                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {categories[payment.category]?.name}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {t.analytics}
              </h2>

              {transactions.length === 0 ? (
                <div
                  className={`${
                    darkMode ? "bg-gray-800/80" : "bg-white/80"
                  } backdrop-blur-xl rounded-2xl p-20 text-center border ${
                    darkMode ? "border-gray-700" : "border-white/20"
                  } shadow-xl`}
                >
                  <TrendingUp
                    size={64}
                    className="mx-auto mb-4 text-indigo-500 opacity-50"
                  />
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.noData}
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {language === "en"
                      ? "Add transactions to see analytics"
                      : "أضف معاملات لرؤية التحليلات"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div
                      className={`${
                        darkMode ? "bg-gray-800/80" : "bg-white/80"
                      } backdrop-blur-xl rounded-2xl p-6 border ${
                        darkMode ? "border-gray-700" : "border-white/20"
                      } shadow-xl`}
                    >
                      <h3
                        className={`text-xl font-bold mb-6 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {language === "en"
                          ? "Category Breakdown"
                          : "تحليل الفئات"}
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getCategoryData()}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={darkMode ? "#374151" : "#e5e7eb"}
                          />
                          <XAxis
                            dataKey="name"
                            stroke={darkMode ? "#9ca3af" : "#6b7280"}
                          />
                          <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: darkMode ? "#1f2937" : "#fff",
                              border: "none",
                              borderRadius: "12px",
                              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                            }}
                          />
                          <Bar
                            dataKey="value"
                            fill="#6366f1"
                            radius={[8, 8, 0, 0]}
                          >
                            {getCategoryData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div
                      className={`${
                        darkMode ? "bg-gray-800/80" : "bg-white/80"
                      } backdrop-blur-xl rounded-2xl p-6 border ${
                        darkMode ? "border-gray-700" : "border-white/20"
                      } shadow-xl`}
                    >
                      <h3
                        className={`text-xl font-bold mb-6 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {language === "en" ? "7 Day Trend" : "اتجاه 7 أيام"}
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={getTimelineData()}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={darkMode ? "#374151" : "#e5e7eb"}
                          />
                          <XAxis
                            dataKey="day"
                            stroke={darkMode ? "#9ca3af" : "#6b7280"}
                          />
                          <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: darkMode ? "#1f2937" : "#fff",
                              border: "none",
                              borderRadius: "12px",
                              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: "#10b981", r: 5 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="expenses"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={{ fill: "#ef4444", r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                      className={`${
                        darkMode
                          ? "bg-gradient-to-br from-green-900/50 to-emerald-900/50"
                          : "bg-gradient-to-br from-green-50 to-emerald-50"
                      } rounded-2xl p-6 border ${
                        darkMode ? "border-green-700/50" : "border-green-200"
                      } shadow-xl`}
                    >
                      <TrendingUp className="text-green-500 mb-3" size={32} />
                      <p
                        className={`text-sm mb-2 ${
                          darkMode ? "text-green-300" : "text-green-700"
                        }`}
                      >
                        {language === "en" ? "Total Income" : "إجمالي الدخل"}
                      </p>
                      <p
                        className={`text-3xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {currencies[currency].symbol}
                        {transactions
                          .filter((t) => t.type === "income")
                          .reduce((sum, t) => sum + t.amount, 0)
                          .toFixed(2)}
                      </p>
                    </div>

                    <div
                      className={`${
                        darkMode
                          ? "bg-gradient-to-br from-red-900/50 to-orange-900/50"
                          : "bg-gradient-to-br from-red-50 to-orange-50"
                      } rounded-2xl p-6 border ${
                        darkMode ? "border-red-700/50" : "border-red-200"
                      } shadow-xl`}
                    >
                      <TrendingDown className="text-red-500 mb-3" size={32} />
                      <p
                        className={`text-sm mb-2 ${
                          darkMode ? "text-red-300" : "text-red-700"
                        }`}
                      >
                        {language === "en"
                          ? "Total Expenses"
                          : "إجمالي المصروفات"}
                      </p>
                      <p
                        className={`text-3xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {currencies[currency].symbol}
                        {transactions
                          .filter((t) => t.type === "expense")
                          .reduce((sum, t) => sum + t.amount, 0)
                          .toFixed(2)}
                      </p>
                    </div>

                    <div
                      className={`${
                        darkMode
                          ? "bg-gradient-to-br from-indigo-900/50 to-blue-900/50"
                          : "bg-gradient-to-br from-indigo-50 to-blue-50"
                      } rounded-2xl p-6 border ${
                        darkMode ? "border-indigo-700/50" : "border-indigo-200"
                      } shadow-xl`}
                    >
                      <Wallet className="text-indigo-500 mb-3" size={32} />
                      <p
                        className={`text-sm mb-2 ${
                          darkMode ? "text-indigo-300" : "text-indigo-700"
                        }`}
                      >
                        {language === "en" ? "Net Balance" : "الرصيد الصافي"}
                      </p>
                      <p
                        className={`text-3xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {currencies[currency].symbol}
                        {(
                          transactions
                            .filter((t) => t.type === "income")
                            .reduce((sum, t) => sum + t.amount, 0) -
                          transactions
                            .filter((t) => t.type === "expense")
                            .reduce((sum, t) => sum + t.amount, 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-3xl shadow-2xl p-8 max-w-md w-full`}
          >
            <h2
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t.addTransaction}
            </h2>

            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setTransactionForm({ ...transactionForm, type: "income" })
                  }
                  className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                    transactionForm.type === "income"
                      ? "bg-green-500 text-white shadow-lg scale-105"
                      : darkMode
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t.income}
                </button>
                <button
                  onClick={() =>
                    setTransactionForm({ ...transactionForm, type: "expense" })
                  }
                  className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                    transactionForm.type === "expense"
                      ? "bg-red-500 text-white shadow-lg scale-105"
                      : darkMode
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t.expenses}
                </button>
              </div>

              <input
                type="number"
                placeholder={t.amount}
                value={transactionForm.amount}
                onChange={(e) =>
                  setTransactionForm({
                    ...transactionForm,
                    amount: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500`}
              />

              <select
                value={transactionForm.category}
                onChange={(e) =>
                  setTransactionForm({
                    ...transactionForm,
                    category: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer`}
              >
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder={t.description}
                value={transactionForm.description}
                onChange={(e) =>
                  setTransactionForm({
                    ...transactionForm,
                    description: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500`}
              />

              <input
                type="date"
                value={transactionForm.date}
                onChange={(e) =>
                  setTransactionForm({
                    ...transactionForm,
                    date: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500`}
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddTransaction(false)}
                  className={`flex-1 py-3 rounded-xl ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-700"
                  } font-medium hover:scale-105 transition-all`}
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleAddTransaction}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium hover:scale-105 transition-all shadow-lg"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Budget Modal */}
      {showAddBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-3xl shadow-2xl p-8 max-w-md w-full`}
          >
            <h2
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t.addBudget}
            </h2>

            <div className="space-y-4">
              <select
                value={budgetForm.category}
                onChange={(e) =>
                  setBudgetForm({ ...budgetForm, category: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer`}
              >
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder={t.limit}
                value={budgetForm.limit}
                onChange={(e) =>
                  setBudgetForm({ ...budgetForm, limit: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500`}
              />

              <select
                value={budgetForm.period}
                onChange={(e) =>
                  setBudgetForm({ ...budgetForm, period: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer`}
              >
                <option value="daily">{t.daily}</option>
                <option value="weekly">{t.weekly}</option>
                <option value="monthly">{t.monthly}</option>
                <option value="yearly">{t.yearly}</option>
              </select>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddBudget(false)}
                  className={`flex-1 py-3 rounded-xl ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-700"
                  } font-medium hover:scale-105 transition-all`}
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleAddBudget}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium hover:scale-105 transition-all shadow-lg"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-3xl shadow-2xl p-8 max-w-md w-full`}
          >
            <h2
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t.addGoal}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder={t.name}
                value={goalForm.name}
                onChange={(e) =>
                  setGoalForm({ ...goalForm, name: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500`}
              />

              <input
                type="number"
                placeholder={t.target}
                value={goalForm.target}
                onChange={(e) =>
                  setGoalForm({ ...goalForm, target: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500`}
              />

              <input
                type="date"
                placeholder={t.deadline}
                value={goalForm.deadline}
                onChange={(e) =>
                  setGoalForm({ ...goalForm, deadline: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500`}
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className={`flex-1 py-3 rounded-xl ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-700"
                  } font-medium hover:scale-105 transition-all`}
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleAddGoal}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium hover:scale-105 transition-all shadow-lg"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Recurring Modal */}
      {showAddRecurring && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-3xl shadow-2xl p-8 max-w-md w-full`}
          >
            <h2
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t.addRecurring}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder={t.name}
                value={recurringForm.name}
                onChange={(e) =>
                  setRecurringForm({ ...recurringForm, name: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500`}
              />

              <input
                type="number"
                placeholder={t.amount}
                value={recurringForm.amount}
                onChange={(e) =>
                  setRecurringForm({ ...recurringForm, amount: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500`}
              />

              <select
                value={recurringForm.category}
                onChange={(e) =>
                  setRecurringForm({
                    ...recurringForm,
                    category: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer`}
              >
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={recurringForm.frequency}
                onChange={(e) =>
                  setRecurringForm({
                    ...recurringForm,
                    frequency: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer`}
              >
                <option value="daily">{t.daily}</option>
                <option value="weekly">{t.weekly}</option>
                <option value="monthly">{t.monthly}</option>
                <option value="yearly">{t.yearly}</option>
              </select>

              <input
                type="date"
                placeholder={t.nextPayment}
                value={recurringForm.nextDate}
                onChange={(e) =>
                  setRecurringForm({
                    ...recurringForm,
                    nextDate: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-indigo-50 text-gray-900"
                } border-none outline-none focus:ring-2 focus:ring-indigo-500`}
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddRecurring(false)}
                  className={`flex-1 py-3 rounded-xl ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-700"
                  } font-medium hover:scale-105 transition-all`}
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleAddRecurring}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium hover:scale-105 transition-all shadow-lg"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Copyright */}
      <footer className="mt-12 pb-6 text-center">
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          &copy; 2025 | All rights reserved. Made by{" "}
          <a
            href="https://portfolio-chi-nine-90.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors underline decoration-2 decoration-indigo-400 underline-offset-2"
          >
            Ahmed Seleem
          </a>
        </p>
      </footer>
    </div>
  );
};

export default SmartFinanceManager;
