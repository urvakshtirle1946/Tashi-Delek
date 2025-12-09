import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email || !form.password) {
      setError("Please fill required fields.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: 'USER',
          phone: form.phone || undefined,
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Registration failed');
      // Expect backend to return token and user
      if (data.token) localStorage.setItem('token', data.token);
      if (data.data?.user) localStorage.setItem('user', JSON.stringify(data.data.user));
      // Redirect to packages for booking
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
          <h1 className="text-2xl font-bold mb-4">Create your account</h1>
          {error && <div className="text-destructive text-sm mb-3">{error}</div>}
          <form onSubmit={submit} className="space-y-3">
            <input className="w-full border rounded px-3 py-2" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="w-full border rounded px-3 py-2" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            <input className="w-full border rounded px-3 py-2" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? 'Registering…' : 'Register'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">Already have an account? <a className="underline" href="/login">Login</a></p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
