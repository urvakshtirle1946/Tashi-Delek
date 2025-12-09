import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Login failed');
      if (data.data?.token) localStorage.setItem('token', data.data.token);
      if (data.data?.user) localStorage.setItem('user', JSON.stringify(data.data.user));
      window.location.href = '/packages';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {error && <div className="text-destructive text-sm mb-3">{error}</div>}
          <form onSubmit={submit} className="space-y-3">
            <input className="w-full border rounded px-3 py-2" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? 'Logging in…' : 'Login'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">No account? <a className="underline" href="/register">Register</a></p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
