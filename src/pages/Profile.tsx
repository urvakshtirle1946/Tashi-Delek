import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to load profile');
      setUser(data.data.user);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }).catch(err => setError(err.message));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>
          {error && <div className="text-destructive text-sm mb-3">{error}</div>}
          {!user ? (
            <div>Loading…</div>
          ) : (
            <div className="space-y-2">
              <div><strong>Name:</strong> {user.name}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Role:</strong> {user.role}</div>
              {user.phone && <div><strong>Phone:</strong> {user.phone}</div>}
              <div className="mt-4">
                <Button onClick={logout}>Logout</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
