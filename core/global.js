/* =========================================================
   GLOBAL.JS — APP CORE
   Fonte única de:
   - sessão
   - usuário
   - role
   - navegação
   - estado de cálculo
========================================================= */

(function () {
  const STORAGE_KEY = "rf_driver_app_state";

  const defaultState = {
    origem: null,
    destino: null,
    valorBase: 0,
    taxas: {
      feira: false,
      excessoPessoas: false,
      animal: null,
      cancelamento: false,
      buscaLonge: false
    }
  };

  const App = {
    state: JSON.parse(JSON.stringify(defaultState)),
    user: null,
    role: null,

    async init() {
      this.loadState();
      await this.loadSession();
      console.info("✅ AppCore iniciado", {
        user: this.user,
        role: this.role,
        state: this.state
      });
    },

    /* ================= ESTADO ================= */

    loadState() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          this.state = JSON.parse(saved);
        } catch {
          this.resetState();
        }
      }
    },

    setState(key, value) {
      this.state[key] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    },

    getState(key) {
      return this.state[key];
    },

    resetState() {
      this.state = JSON.parse(JSON.stringify(defaultState));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    },

    /* ================= SESSÃO ================= */

    async loadSession() {
      const { data } = await SUPABASE.client.auth.getSession();
      const session = data?.session;

      if (!session) {
        this.user = null;
        this.role = null;
        return;
      }

      this.user = session.user;
      this.role = session.user.user_metadata?.role || null;
    },

    async requireAuth(roles = []) {
      await this.loadSession();

      if (!this.user) {
        this.go("index.html");
        return;
      }

      if (roles.length && !roles.includes(this.role)) {
        alert("Acesso não autorizado");
        this.go("index.html");
      }
    },

    async logout() {
      await SUPABASE.client.auth.signOut();
      this.user = null;
      this.role = null;
      this.go("index.html");
    },

    /* ================= LOGIN ================= */

    loginSuccess(user) {
      this.user = user;
      this.role = user.user_metadata?.role || null;

      if (this.role === "admin") this.go("dashboard-admin.html");
      else if (this.role === "motorista") this.go("dashboard-motorista.html");
      else this.go("dashboard-passageiro.html");
    },

    /* ================= NAV ================= */

    go(page) {
      window.location.href = page;
    }
  };

  window.App = App;
  App.init();
})();