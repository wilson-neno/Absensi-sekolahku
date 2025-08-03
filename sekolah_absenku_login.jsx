import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { LogIn, User, Shield, Calendar, Settings, HelpCircle, Trash2 } from "lucide-react";

function LoginPage({ onLogin }) {
  const [role, setRole] = useState("siswa");

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-2 text-blue-800">Sekolah Absenku</h1>
      <p className="text-md text-blue-600 mb-4">TK SION TERPADU</p>

      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <Tabs defaultValue="siswa" className="w-full" onValueChange={setRole}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="siswa">
                <User className="mr-1 h-4 w-4" /> Siswa
              </TabsTrigger>
              <TabsTrigger value="guru">
                <Shield className="mr-1 h-4 w-4" /> Guru
              </TabsTrigger>
              <TabsTrigger value="admin">
                <LogIn className="mr-1 h-4 w-4" /> Admin
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(role); }}>
            <Input type="text" placeholder="Email atau Username" required />
            <Input type="password" placeholder="Password" required />
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Masuk sebagai {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            Butuh bantuan? <a href="#" className="text-blue-600 underline">Lihat tutorial</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SiswaDashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Halo, Siswa!</h2>
      <Button className="w-full bg-green-500 text-white">Absen Masuk</Button>
      <Button className="w-full bg-red-400 text-white">Absen Pulang</Button>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium text-lg mb-2">Status Kehadiran Hari Ini</h3>
        <p>Hadir</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium text-lg mb-2">Riwayat Absensi</h3>
        <ul className="text-sm text-gray-700">
          <li>01 Agustus 2025 - Hadir</li>
          <li>31 Juli 2025 - Izin</li>
          <li>30 Juli 2025 - Hadir</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium text-lg mb-2 flex items-center gap-2"><Calendar className="h-5 w-5" /> Kalender Kehadiran</h3>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: 'Hadir', date: '2025-08-01', color: 'green' },
            { title: 'Izin', date: '2025-07-31', color: 'orange' },
            { title: 'Sakit', date: '2025-07-28', color: 'red' },
          ]}
          height="auto"
        />
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium text-lg mb-2">Rekap Kehadiran Mingguan/Bulanan</h3>
        <ul className="text-sm text-gray-700">
          <li>Minggu ini: 5 Hadir, 0 Izin, 0 Sakit</li>
          <li>Bulan ini: 20 Hadir, 2 Izin, 1 Sakit</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium text-lg mb-2 flex items-center gap-2"><Settings className="h-5 w-5" /> Pengaturan Akun</h3>
        <form className="space-y-2">
          <Input type="text" placeholder="Nama Lengkap" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password Baru" />
          <Button className="bg-blue-600 text-white">Simpan Perubahan</Button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium text-lg mb-2 flex items-center gap-2"><HelpCircle className="h-5 w-5" /> Bantuan & Tutorial</h3>
        <ul className="text-sm text-blue-700 list-disc ml-5">
          <li><a href="#">Cara absen masuk dan pulang</a></li>
          <li><a href="#">Melihat riwayat dan rekap</a></li>
          <li><a href="#">Mengubah data akun</a></li>
          <li><a href="#">[Video] Panduan penggunaan</a></li>
        </ul>
      </div>
    </div>
  );
}

function GuruDashboard() {
  const [events, setEvents] = useState([
    { title: 'Kelas 1A - Absen', date: '2025-08-02', color: 'blue' },
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [status, setStatus] = useState("hadir");

  const statusColors = {
    hadir: "green",
    izin: "orange",
    sakit: "red",
    lainnya: "blue",
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowDialog(true);
  };

  const handleAddEvent = () => {
    if (newTitle && selectedDate) {
      setEvents([...events, {
        title: newTitle,
        date: selectedDate,
        color: statusColors[status] || "blue"
      }]);
      setShowDialog(false);
      setNewTitle("");
    }
  };

  const handleEventClick = (info) => {
    const confirmed = window.confirm(`Hapus event "${info.event.title}"?`);
    if (confirmed) {
      setEvents(events.filter((e) => !(e.title === info.event.title && e.date === info.event.startStr)));
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Guru</h2>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium text-lg mb-2">Kalender Kelas</h3>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
        />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Event pada {selectedDate}</DialogTitle>
          </DialogHeader>
          <Label className="block mb-1">Judul Event</Label>
          <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Masukkan judul event" />
          <Label className="block mt-4 mb-1">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hadir">Hadir</SelectItem>
              <SelectItem value="izin">Izin</SelectItem>
              <SelectItem value="sakit">Sakit</SelectItem>
              <SelectItem value="lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>
          <Button className="mt-4 bg-blue-600 text-white" onClick={handleAddEvent}>Tambahkan</Button>
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium text-lg mb-2">Daftar Siswa - Kelas 1A</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Nama</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Andi</td>
              <td>
                <select className="border rounded px-2 py-1">
                  <option>Hadir</option>
                  <option>Izin</option>
                  <option>Sakit</option>
                  <option>Alpha</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Budi</td>
              <td>
                <select className="border rounded px-2 py-1">
                  <option>Hadir</option>
                  <option>Izin</option>
                  <option>Sakit</option>
                  <option>Alpha</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Button className="bg-blue-600 text-white">Cetak Rekap</Button>
    </div>
  );
}

function AdminDashboard() {
  const [events, setEvents] = useState([
    { title: 'Rekap Bulanan', date: '2025-08-03', color: 'purple' },
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStatus, setEventStatus] = useState("lainnya");

  const statusColors = {
    hadir: "green",
    izin: "orange",
    sakit: "red",
    lainnya: "purple",
  };

  const handleEventClick = (info) => {
    const clickedEvent = events.find((e) => e.title === info.event.title && e.date === info.event.startStr);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setEventTitle(clickedEvent.title);
      setEventStatus(Object.keys(statusColors).find(key => statusColors[key] === clickedEvent.color) || "lainnya");
      setShowDialog(true);
    }
  };

  const handleUpdateEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.map((e) =>
      e === selectedEvent ? { ...e, title: eventTitle, color: statusColors[eventStatus] } : e
    ));
    setShowDialog(false);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter((e) => e !== selectedEvent));
    setShowDialog(false);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Admin</h2>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium text-lg mb-2">Kalender Administrasi</h3>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          height="auto"
        />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <Label className="block mb-1">Judul</Label>
          <Input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
          <Label className="block mt-4 mb-1">Status</Label>
          <Select value={eventStatus} onValueChange={setEventStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hadir">Hadir</SelectItem>
              <SelectItem value="izin">Izin</SelectItem>
              <SelectItem value="sakit">Sakit</SelectItem>
              <SelectItem value="lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-between mt-4">
            <Button onClick={handleUpdateEvent} className="bg-blue-600 text-white">Simpan</Button>
            <Button onClick={handleDeleteEvent} className="bg-red-600 text-white">Hapus</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium text-lg mb-2">Statistik Kehadiran</h3>
          <p>Persentase Kehadiran Bulan Ini: 94%</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium text-lg mb-2">Ekspor Data</h3>
          <Button className="mr-2 bg-green-600 text-white">Ekspor ke Excel</Button>
          <Button className="bg-red-600 text-white">Ekspor ke PDF</Button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState(null);

  if (!role) return <LoginPage onLogin={setRole} />;
  if (role === "siswa") return <SiswaDashboard />;
  if (role === "guru") return <GuruDashboard />;
  if (role === "admin") return <AdminDashboard />;
  return null;
}
