import React, { useState, useMemo } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  ClipboardList, 
  CheckCircle, 
  Download, 
  Menu, 
  BarChart2, 
  AlertCircle, 
  Settings, 
  Droplet,
  ChevronRight,
  History,
  Home
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { GeminiChat } from './components/GeminiChat';
import { User as UserType, Center, Appointment, BloodNeed, InventoryItem } from './types';

// --- MOCK DATA ---
const MOCK_USER: UserType = {
  name: "Alex Sterling",
  points: 1250,
  bloodType: "O+",
  preferences: {
    notifications: true,
    preferredCenters: ["Downtown Hub"],
  }
};

const MOCK_CENTERS: Center[] = [
  { id: '1', name: "Metro Blood Center", address: "123 Main St, Downtown", distance: "0.8 miles", hours: "08:00 - 18:00", availableSlots: ["09:00", "10:30", "14:00"] },
  { id: '2', name: "St. Mary's Hospital", address: "45 River Rd, Northside", distance: "2.4 miles", hours: "24/7", availableSlots: ["11:00", "13:00", "16:30"] },
  { id: '3', name: "Community Hall Drive", address: "88 Oak Ave, West End", distance: "5.1 miles", hours: "09:00 - 15:00", availableSlots: ["09:30", "12:00"] },
];

const MOCK_NEEDS: BloodNeed[] = [
  { id: '1', type: 'A-', urgency: 'Critical', location: 'General Hospital', requester: 'Trauma Unit' },
  { id: '2', type: 'O+', urgency: 'High', location: 'City Clinic', requester: 'Surgery Dept' },
  { id: '3', type: 'B+', urgency: 'Moderate', location: 'Children\'s Center', requester: 'Oncology' },
];

const MOCK_INVENTORY: InventoryItem[] = [
  { type: 'A+', level: 65 },
  { type: 'A-', level: 20 },
  { type: 'B+', level: 80 },
  { type: 'B-', level: 45 },
  { type: 'O+', level: 55 },
  { type: 'O-', level: 15 },
  { type: 'AB+', level: 90 },
  { type: 'AB-', level: 30 },
];

const PAST_APPOINTMENTS: Appointment[] = [
  { id: 'a1', centerId: '1', centerName: "Metro Blood Center", date: "2023-10-15", time: "10:00", status: "completed" },
  { id: 'a2', centerId: '2', centerName: "St. Mary's Hospital", date: "2023-06-22", time: "14:30", status: "completed" },
];

// --- COMPONENTS ---

// 1. Header with Profile
const Header = ({ user, onViewChange }: { user: UserType, onViewChange: (v: string) => void }) => (
  <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-blue-900/50 px-6 py-4 flex justify-between items-center shadow-[0_4px_20px_rgba(0,0,128,0.3)]">
    <div 
      onClick={() => onViewChange('dashboard')}
      className="flex items-center gap-2 cursor-pointer group"
    >
      <div className="bg-blue-900 p-2 rounded-full group-hover:bg-blue-800 transition-colors">
        <Droplet className="text-blue-400 w-6 h-6 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" />
      </div>
      <h1 className="text-xl font-bold text-blue-700 group-hover:text-blue-500 transition-colors tracking-wider">
        HEMO<span className="text-white">LINK</span>
      </h1>
    </div>

    <div className="flex items-center gap-6">
      <div 
        onClick={() => onViewChange('profile')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="text-right hidden sm:block">
          <p className="text-blue-500 font-medium group-hover:text-blue-300 transition-colors text-sm">{user.name}</p>
          <p className="text-xs text-gray-500 group-hover:text-gray-300">{user.points} Credits</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-950 border border-blue-800 flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all">
          <User className="w-5 h-5 text-blue-400 group-hover:text-white" />
        </div>
      </div>
    </div>
  </header>
);

// 2. Dashboard View
const Dashboard = ({ onStartBooking }: { onStartBooking: () => void }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-neutral-950/80 backdrop-blur-sm border border-blue-900/50 p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Droplet className="w-48 h-48 text-blue-800" />
          </div>
          <h2 className="text-2xl text-blue-500 font-bold mb-4 neon-text">Save a Life Today</h2>
          <p className="text-gray-400 mb-8 max-w-md">Your contribution makes a difference. Check local needs and schedule your donation in just a few clicks.</p>
          <button 
            onClick={onStartBooking}
            className="bg-blue-800 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-[0_0_15px_rgba(30,58,138,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Book Appointment
          </button>
        </div>

        {/* Blood Needs */}
        <div className="bg-neutral-950/80 backdrop-blur-sm border border-blue-900/50 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl text-blue-400 font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Urgent Requests
            </h3>
            <span className="text-xs text-blue-800 uppercase tracking-widest font-bold animate-pulse">Live Data</span>
          </div>
          <div className="space-y-3">
            {MOCK_NEEDS.map(need => (
              <div key={need.id} className="flex items-center justify-between p-3 bg-black/50 border border-blue-900/30 rounded-lg hover:border-blue-500/50 transition-colors group cursor-default">
                <div className="flex items-center gap-4">
                  <span className={`font-bold text-lg w-10 h-10 flex items-center justify-center rounded bg-gray-900 ${need.urgency === 'Critical' ? 'text-red-500 shadow-[0_0_8px_rgba(220,38,38,0.4)]' : 'text-blue-400'}`}>
                    {need.type}
                  </span>
                  <div>
                    <p className="text-gray-300 text-sm font-medium group-hover:text-blue-300 transition-colors">{need.location}</p>
                    <p className="text-xs text-gray-600">{need.requester}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded border ${
                  need.urgency === 'Critical' 
                    ? 'border-red-900 text-red-500 bg-red-950/20' 
                    : 'border-blue-900 text-blue-500 bg-blue-950/20'
                }`}>
                  {need.urgency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Chart */}
      <div className="bg-neutral-950/80 backdrop-blur-sm border border-blue-900/50 p-6 rounded-2xl">
        <h3 className="text-xl text-blue-400 font-semibold mb-6 flex items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          Local Blood Bank Inventory
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_INVENTORY}>
              <XAxis dataKey="type" stroke="#1e3a8a" tick={{fill: '#60a5fa'}} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', borderColor: '#1e3a8a', color: '#fff' }}
                cursor={{fill: 'rgba(30, 58, 138, 0.2)'}}
              />
              <Bar dataKey="level" radius={[4, 4, 0, 0]}>
                {MOCK_INVENTORY.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.level < 30 ? '#ef4444' : '#1e40af'} 
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// 3. Scheduler Flow
const Scheduler = ({ onComplete, onCancel }: { onComplete: () => void, onCancel: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '',
    centerId: '',
    date: '',
    time: '',
    name: MOCK_USER.name,
    email: '',
    phone: ''
  });

  const handleNext = () => setStep(p => p + 1);
  const handleBack = () => setStep(p => p - 1);

  // Step 1: Location
  if (step === 1) return (
    <div className="max-w-xl mx-auto animate-in slide-in-from-right duration-500">
      <h2 className="text-2xl text-blue-500 font-bold mb-6 neon-text">Select Location</h2>
      <div className="bg-neutral-950/80 backdrop-blur-sm p-8 rounded-2xl border border-blue-900/50 space-y-6">
        <div>
          <label className="block text-blue-700 text-sm font-bold mb-2 neon-hover cursor-pointer transition-all">Search City or Zip</label>
          <div className="relative group">
            <MapPin className="absolute left-3 top-3 text-blue-800 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              className="w-full bg-black/80 border border-blue-900 rounded-lg py-3 pl-10 text-blue-100 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
              placeholder="e.g. Downtown"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <button onClick={onCancel} className="text-gray-500 hover:text-white transition-colors">Cancel</button>
          <button 
            disabled={!formData.location}
            onClick={handleNext}
            className="bg-blue-800 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded shadow-lg transition-all"
          >
            Find Centers
          </button>
        </div>
      </div>
    </div>
  );

  // Step 2: Available Centers
  if (step === 2) return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-right duration-500">
      <h2 className="text-2xl text-blue-500 font-bold mb-6 neon-text">Available Centers</h2>
      <div className="grid gap-4">
        {MOCK_CENTERS.map(center => (
          <div 
            key={center.id}
            onClick={() => {
              setFormData({...formData, centerId: center.id});
              handleNext();
            }}
            className="bg-neutral-950/80 backdrop-blur-sm p-6 rounded-xl border border-blue-900/30 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(0,0,128,0.4)] cursor-pointer transition-all group flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg text-blue-400 font-bold group-hover:text-white transition-colors">{center.name}</h3>
              <p className="text-gray-500 text-sm">{center.address}</p>
              <div className="flex gap-4 mt-2 text-xs text-blue-800 font-semibold">
                <span>{center.distance}</span>
                <span>•</span>
                <span>{center.hours}</span>
              </div>
            </div>
            <ChevronRight className="text-blue-900 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </div>
        ))}
      </div>
      <button onClick={handleBack} className="mt-6 text-gray-500 hover:text-white transition-colors">Back</button>
    </div>
  );

  // Step 3: Date & Time
  if (step === 3) {
    const selectedCenter = MOCK_CENTERS.find(c => c.id === formData.centerId);
    return (
      <div className="max-w-xl mx-auto animate-in slide-in-from-right duration-500">
        <h2 className="text-2xl text-blue-500 font-bold mb-6 neon-text">Select Date & Time</h2>
        <div className="bg-neutral-950/80 backdrop-blur-sm p-8 rounded-2xl border border-blue-900/50 space-y-6">
          
          {/* Date */}
          <div>
            <label className="block text-blue-700 text-sm font-bold mb-2 neon-hover">Date</label>
            <input 
              type="date" 
              className="w-full bg-black/80 border border-blue-900 rounded-lg p-3 text-blue-100 focus:outline-none focus:border-blue-500 transition-all color-scheme-dark"
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>

          {/* Time Slots */}
          {formData.date && (
            <div>
              <label className="block text-blue-700 text-sm font-bold mb-2 neon-hover">Available Slots</label>
              <div className="grid grid-cols-3 gap-3">
                {selectedCenter?.availableSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setFormData({...formData, time: slot})}
                    className={`p-2 rounded border text-sm font-medium transition-all ${
                      formData.time === slot 
                      ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_10px_rgba(37,99,235,0.6)]' 
                      : 'border-blue-900 text-blue-400 hover:border-blue-500 hover:text-blue-200'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <button onClick={handleBack} className="text-gray-500 hover:text-white">Back</button>
            <button 
              disabled={!formData.date || !formData.time}
              onClick={handleNext}
              className="bg-blue-800 hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded shadow-lg transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Details Form
  if (step === 4) return (
    <div className="max-w-xl mx-auto animate-in slide-in-from-right duration-500">
      <h2 className="text-2xl text-blue-500 font-bold mb-6 neon-text">Donor Details</h2>
      <div className="bg-neutral-950/80 backdrop-blur-sm p-8 rounded-2xl border border-blue-900/50 space-y-4">
        
        {['name', 'email', 'phone'].map((field) => (
          <div key={field}>
             <label className="block text-blue-700 text-sm font-bold mb-2 capitalize neon-hover transition-all">{field}</label>
             <input 
              type={field === 'email' ? 'email' : 'text'}
              value={formData[field as keyof typeof formData]}
              onChange={e => setFormData({...formData, [field]: e.target.value})}
              className="w-full bg-black/80 border border-blue-900 rounded-lg p-3 text-blue-100 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all"
             />
          </div>
        ))}

        <div className="flex justify-between pt-6">
          <button onClick={handleBack} className="text-gray-500 hover:text-white">Back</button>
          <button 
            disabled={!formData.name || !formData.email || !formData.phone}
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all"
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );

  // Step 5: Confirmation
  if (step === 5) return (
    <div className="max-w-lg mx-auto text-center animate-in zoom-in duration-500">
      <div className="inline-flex p-4 rounded-full bg-blue-900/30 border border-blue-500 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        <CheckCircle className="w-16 h-16 text-blue-400" />
      </div>
      <h2 className="text-3xl text-white font-bold mb-2 neon-text">Appointment Confirmed!</h2>
      <p className="text-blue-300 mb-8">Thank you, {formData.name}. Your contribution saves lives.</p>
      
      <div className="bg-neutral-900/80 backdrop-blur-sm border border-blue-900 p-6 rounded-lg mb-8 text-left">
        <p className="text-gray-400 text-sm">Center</p>
        <p className="text-blue-400 font-semibold mb-3">{MOCK_CENTERS.find(c => c.id === formData.centerId)?.name}</p>
        <p className="text-gray-400 text-sm">Date & Time</p>
        <p className="text-blue-400 font-semibold">{formData.date} at {formData.time}</p>
      </div>

      <div className="flex flex-col gap-3">
        <button 
          className="bg-blue-800 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
          onClick={() => alert("Downloading PDF...")}
        >
          <Download className="w-4 h-4" /> Download Appointment Letter
        </button>
        <button onClick={onComplete} className="text-gray-500 hover:text-white py-2">Return to Dashboard</button>
      </div>
    </div>
  );

  return null;
};

// 4. Profile & Preferences
const UserProfile = ({ user }: { user: UserType }) => {
  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-900 to-black border-2 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <User className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white neon-text">{user.name}</h2>
          <p className="text-blue-400 font-mono mt-1">Blood Type: {user.bloodType}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-blue-900/50 border border-blue-800 rounded text-sm text-blue-200">
            {user.points} Credit Points
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Past Appointments */}
        <div className="bg-neutral-950/80 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6">
          <h3 className="text-xl text-blue-500 font-bold mb-4 flex items-center gap-2">
            <History className="w-5 h-5" /> Past Appointments
          </h3>
          <div className="space-y-4">
            {PAST_APPOINTMENTS.map(appt => (
              <div key={appt.id} className="flex justify-between items-center border-b border-blue-900/30 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-white font-medium">{appt.centerName}</p>
                  <p className="text-sm text-gray-500">{appt.date}</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-900">Completed</span>
                  <button className="text-blue-600 hover:text-blue-400 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-neutral-950/80 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-blue-500 font-bold flex items-center gap-2">
              <Settings className="w-5 h-5" /> Preferences
            </h3>
            <button className="text-xs text-blue-700 hover:text-white transition-colors">Edit</button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between p-3 bg-black/60 rounded border border-blue-900/20">
              <span className="text-gray-300">Notifications</span>
              <span className="text-blue-400 font-bold">{user.preferences.notifications ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex justify-between p-3 bg-black/60 rounded border border-blue-900/20">
              <span className="text-gray-300">Preferred Center</span>
              <span className="text-blue-400 font-bold">{user.preferences.preferredCenters[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState<'dashboard' | 'booking' | 'profile'>('dashboard');

  return (
    <div className="min-h-screen bg-black text-blue-100 font-sans selection:bg-blue-900 selection:text-white relative">
      <Header user={MOCK_USER} onViewChange={setView} />
      
      <main className="container mx-auto px-4 py-8 pb-32">
        {view === 'dashboard' && <Dashboard onStartBooking={() => setView('booking')} />}
        {view === 'booking' && <Scheduler onComplete={() => setView('dashboard')} onCancel={() => setView('dashboard')} />}
        {view === 'profile' && <UserProfile user={MOCK_USER} />}
      </main>

      <GeminiChat />
      
      {/* Background Biology Theme */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-black">
        {/* Biology Image Layer */}
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop')" 
          }}
        />
        
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black/95" />

        {/* Blue Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}