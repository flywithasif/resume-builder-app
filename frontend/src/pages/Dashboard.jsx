// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateProfile, updateEmail } from "firebase/auth";
import { auth } from "../lib/firebase";
import { toast } from "react-hot-toast";

// per-user localStorage key
const resumesKey = (uid) => `resumes_${uid || "anon"}`;

export default function Dashboard() {
  const { user, logout } = useAuth() || {};
  const navigate = useNavigate();

  // ui state
  const [activeTab, setActiveTab] = useState("home"); // home, mydocs, account, upload, create, help
  const [resumes, setResumes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showUploadPicker, setShowUploadPicker] = useState(false);
  const [query, setQuery] = useState("");

  // account/profile local state (render-only)
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    avatar: "",
    email: "",
  });
  const [passwords, setPasswords] = useState({ current: "", newp: "", confirm: "" });

  // load per-user resumes + profile
  useEffect(() => {
    const key = resumesKey(user?.uid);
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    setResumes(saved);

    // derive name parts from Firebase user
    const display = user?.displayName || "";
    const [fn, ...rest] = display.split(" ").filter(Boolean);
    setProfile((p) => ({
      ...p,
      firstName: fn || "",
      lastName: rest.join(" "),
      email: user?.email || "",
      avatar: user?.photoURL || "",
    }));
  }, [user]);

  // derived counts
  const counts = useMemo(
    () => ({
      total: resumes.length,
      uploaded: resumes.filter((r) => r.type === "upload").length,
      created: resumes.filter((r) => r.type !== "upload").length,
    }),
    [resumes]
  );

  // helpers
  const persist = (next) => {
    if (!user?.uid) return;
    setResumes(next);
    localStorage.setItem(resumesKey(user.uid), JSON.stringify(next));
  };

  const openCreate = (type = "resume") => {
    setSelected({
      id: Date.now(),
      name:
        type === "resume"
          ? "Untitled Resume"
          : type === "cv"
          ? "Untitled CV"
          : "Untitled Cover Letter",
      title: "",
      email: user?.email || "",
      phone: "",
      summary: "",
      experience: [{ company: "", position: "", start: "", end: "", desc: "" }],
      education: [{ school: "", degree: "", year: "" }],
      skills: [""],
      createdAt: new Date().toISOString(),
      type,
    });
    setShowEditor(true);
    setActiveTab("mydocs");
  };

  const openEdit = (id) => {
    const found = resumes.find((r) => String(r.id) === String(id));
    if (!found) return toast.error("Resume not found");
    setSelected({ ...found });
    setShowEditor(true);
    setActiveTab("mydocs");
  };

  const saveResume = (item) => {
    const existing = resumes.find((r) => String(r.id) === String(item.id));
    let next;
    if (existing) {
      next = resumes.map((r) => (String(r.id) === String(item.id) ? item : r));
    } else {
      next = [item, ...resumes];
    }
    persist(next);
    setShowEditor(false);
    setSelected(null);
    toast.success("Saved!");
  };

  const deleteResume = (id) => {
    if (!window.confirm("Delete this document?")) return;
    const next = resumes.filter((r) => String(r.id) !== String(id));
    persist(next);
    toast.success("Deleted");
  };

  const duplicateResume = (id) => {
    const found = resumes.find((r) => String(r.id) === String(id));
    if (!found) return;
    const copy = {
      ...found,
      id: Date.now(),
      name: found.name + " (copy)",
      createdAt: new Date().toISOString(),
    };
    persist([copy, ...resumes]);
    toast.success("Duplicated");
  };

  const downloadHTML = (item) => {
    const html = generateTemplateHTML(item).html;
    const win = window.open("", "_blank", "width=900,height=700");
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 500);
  };

  const handleUploadFile = async (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const meta = {
      id: Date.now(),
      name: file.name,
      type: "upload",
      fileUrl: url,
      size: file.size,
      createdAt: new Date().toISOString(),
    };
    persist([meta, ...resumes]);
    setShowUploadPicker(false);
    setActiveTab("mydocs");
    toast.success("Uploaded");
  };

  // profile actions
  const handleProfileSave = async () => {
    try {
      if (!auth.currentUser) throw new Error("Not signed in");
      const displayName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim();
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: profile.avatar || null,
      });
      toast.success("Profile updated");
    } catch (e) {
      toast.error(e?.message || "Profile update failed");
    }
  };

  const handleChangeEmail = async () => {
    try {
      if (!auth.currentUser) throw new Error("Not signed in");
      await updateEmail(auth.currentUser, profile.email);
      toast.success("Email updated");
    } catch (e) {
      toast.error(
        e?.code === "auth/requires-recent-login"
          ? "Please log out & log in again, then try changing email."
          : e?.message || "Email update failed"
      );
    }
  };

  const handleAvatarUpload = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((p) => ({ ...p, avatar: url }));
  };

  // search filter
  const filtered = resumes.filter((r) =>
    query.trim()
      ? (r.name || r.fileName || "").toLowerCase().includes(query.toLowerCase())
      : true
  );

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Please login to see your dashboard</h2>
        </div>
      </div>
    );
  }

  const nameForUI =
    profile.firstName ||
    user.displayName ||
    (user.email ? user.email.split("@")[0] : "User");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-3 bg-white rounded shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {profile.avatar ? (
                <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">
                  {(nameForUI || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="font-semibold">{nameForUI}</div>
              <div className="text-xs text-gray-500">{profile.email || user.email}</div>
            </div>
          </div>

          <div className="mt-6">
            <nav className="flex flex-col gap-1 text-sm">
              <button
                onClick={() => setActiveTab("home")}
                className={`text-left p-2 rounded ${
                  activeTab === "home" ? "bg-indigo-50" : "hover:bg-gray-50"
                }`}
              >
                Dashboard Home
              </button>
              <button
                onClick={() => setActiveTab("mydocs")}
                className={`text-left p-2 rounded ${
                  activeTab === "mydocs" ? "bg-indigo-50" : "hover:bg-gray-50"
                }`}
              >
                My Documents
              </button>
              <button
                onClick={() => setActiveTab("create")}
                className={`text-left p-2 rounded ${
                  activeTab === "create" ? "bg-indigo-50" : "hover:bg-gray-50"
                }`}
                onDoubleClick={() => openCreate("resume")}
              >
                Create New
              </button>
              <button
                onClick={() => setActiveTab("account")}
                className={`text-left p-2 rounded ${
                  activeTab === "account" ? "bg-indigo-50" : "hover:bg-gray-50"
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`text-left p-2 rounded ${
                  activeTab === "upload" ? "bg-indigo-50" : "hover:bg-gray-50"
                }`}
              >
                Upload Resume
              </button>
              <button
                onClick={() => setActiveTab("help")}
                className={`text-left p-2 rounded ${
                  activeTab === "help" ? "bg-indigo-50" : "hover:bg-gray-50"
                }`}
              >
                Help / Support
              </button>
            </nav>

            <div className="mt-6 border-t pt-4">
              <button
                onClick={() => openCreate("resume")}
                className="w-full bg-indigo-600 text-white py-2 rounded mb-2"
              >
                + Create Resume
              </button>
              <button
                onClick={() => openCreate("cv")}
                className="w-full bg-green-600 text-white py-2 rounded mb-2"
              >
                + Create CV
              </button>
              <button
                onClick={() => openCreate("cover")}
                className="w-full bg-yellow-500 text-black py-2 rounded mb-2"
              >
                + Create Cover Letter
              </button>
              <button
                onClick={() => setShowUploadPicker(true)}
                className="w-full bg-gray-100 py-2 rounded"
              >
                Upload Resume
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => toast("Upgrade flow coming soon")}
                className="text-sm underline text-indigo-600"
              >
                Upgrade Now
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
                className="w-full text-sm border py-2 rounded text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="md:col-span-9">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {nameForUI}</h1>
              <p className="text-sm text-gray-500">
                Manage your resumes, CVs and cover letters from one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-white border rounded p-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-none outline-none text-sm"
                  placeholder="Search documents..."
                />
              </div>
              <button onClick={() => openCreate("resume")} className="bg-indigo-600 text-white px-4 py-2 rounded">
                Create
              </button>
              <button
                onClick={() => toast("Upgrade coming soon")}
                className="bg-yellow-400 px-3 py-2 rounded hidden md:inline"
              >
                Upgrade
              </button>
            </div>
          </div>

          {/* content by tab */}
          {activeTab === "home" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-500">Total Documents</div>
                <div className="text-2xl font-bold">{counts.total}</div>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-500">Created</div>
                <div className="text-2xl font-bold">{counts.created}</div>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-500">Uploaded</div>
                <div className="text-2xl font-bold">{counts.uploaded}</div>
              </div>

              <div className="col-span-full mt-4 bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Recent Activity</h3>
                <div className="space-y-2">
                  {resumes.slice(0, 5).map((r) => (
                    <div key={r.id} className="flex items-center justify-between border rounded p-2">
                      <div>
                        <div className="font-medium">{r.name || r.fileName}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(r.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {r.type === "upload" ? (
                          <a
                            href={r.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm underline"
                          >
                            View
                          </a>
                        ) : (
                          <button onClick={() => openEdit(r.id)} className="text-sm text-indigo-600">
                            Edit
                          </button>
                        )}
                        <button onClick={() => deleteResume(r.id)} className="text-sm text-red-600">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {resumes.length === 0 && (
                    <div className="text-sm text-gray-500">
                      No activity yet. Create your first resume!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "mydocs" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">My Documents</h3>
                <div className="text-sm text-gray-500">{resumes.length} items</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((r) => (
                  <div key={r.id} className="bg-white p-4 rounded shadow flex flex-col">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="font-semibold">{r.name || r.fileName}</div>
                        <div className="text-xs text-gray-500">
                          {r.type === "upload" ? "Uploaded Document" : String(r.type || "Resume").toUpperCase()}
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          {r.summary && r.summary.slice(0, 120)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xs text-gray-500">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          {r.type !== "upload" && (
                            <button onClick={() => openEdit(r.id)} className="text-sm underline">
                              Edit
                            </button>
                          )}
                          {r.type !== "upload" && (
                            <button onClick={() => downloadHTML(r)} className="text-sm underline">
                              Print
                            </button>
                          )}
                          <button onClick={() => duplicateResume(r.id)} className="text-sm underline">
                            Duplicate
                          </button>
                          <button onClick={() => deleteResume(r.id)} className="text-sm text-red-600">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {resumes.length === 0 && (
                  <div className="text-sm text-gray-500">
                    No documents yet. Create one using the button on the left.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Upload Resume / CV</h3>
              <p className="text-sm text-gray-500 mb-4">
                Upload a PDF or Word document to keep in your dashboard.
              </p>
              <div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleUploadFile(e.target.files?.[0])}
                />
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-4">Account Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">First name</label>
                  <input
                    value={profile.firstName}
                    onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                    className="w-full border p-2 rounded mb-2"
                  />

                  <label className="block text-sm font-medium">Last name</label>
                  <input
                    value={profile.lastName}
                    onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                    className="w-full border p-2 rounded mb-2"
                  />

                  <label className="block text-sm font-medium">Birth date</label>
                  <input
                    type="date"
                    value={profile.dob}
                    onChange={(e) => setProfile((p) => ({ ...p, dob: e.target.value }))}
                    className="w-full border p-2 rounded mb-2"
                  />

                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    value={profile.phone}
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full border p-2 rounded mb-2"
                  />

                  <label className="block text-sm font-medium">Profile Photo</label>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-20 rounded overflow-hidden bg-gray-100">
                      {profile.avatar ? (
                        <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="p-4 text-gray-400">No image</div>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAvatarUpload(e.target.files?.[0])}
                      />
                      {profile.avatar && (
                        <button
                          onClick={() => setProfile((p) => ({ ...p, avatar: "" }))}
                          className="text-sm text-red-600 mt-2"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button onClick={handleProfileSave} className="bg-indigo-600 text-white px-4 py-2 rounded">
                      Save Profile
                    </button>
                    <button onClick={handleChangeEmail} className="ml-2 border px-3 py-2 rounded">
                      Change Email
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Security</h4>
                  <label className="block text-sm font-medium">Current password</label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords((s) => ({ ...s, current: e.target.value }))}
                    className="w-full border p-2 rounded mb-2"
                  />
                  <label className="block text-sm font-medium">New password</label>
                  <input
                    type="password"
                    value={passwords.newp}
                    onChange={(e) => setPasswords((s) => ({ ...s, newp: e.target.value }))}
                    className="w-full border p-2 rounded mb-2"
                  />
                  <label className="block text-sm font-medium">Confirm password</label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords((s) => ({ ...s, confirm: e.target.value }))}
                    className="w-full border p-2 rounded mb-2"
                  />
                  <div className="mt-2">
                    <button
                      onClick={() => toast("Password change needs backend/reauth flow")}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "help" && (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Help & Support</h3>
              <p className="text-sm text-gray-500">
                For support, email <strong>support@yourapp.example</strong> or visit the documentation.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Editor Modal */}
      {showEditor && selected && (
        <EditorModal
          item={selected}
          onClose={() => {
            setShowEditor(false);
            setSelected(null);
          }}
          onSave={(it) => saveResume(it)}
        />
      )}

      {/* Upload picker modal */}
      {showUploadPicker && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="font-semibold mb-2">Upload a file</h3>
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleUploadFile(e.target.files?.[0])} />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowUploadPicker(false)} className="px-3 py-2 border rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditorModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item);

  useEffect(() => setForm(item), [item]);

  const updateField = (path, value) => {
    if (!path.includes(".")) {
      setForm((f) => ({ ...f, [path]: value }));
      return;
    }
    const parts = path.split(".");
    const top = parts[0];
    const rest = parts.slice(1);
    setForm((f) => {
      const copy = { ...f };
      const cur = copy[top] || [];
      const idx = Number(rest[0]);
      const key = rest[1];
      cur[idx] = { ...cur[idx], [key]: value };
      copy[top] = [...cur];
      return copy;
    });
  };

  const addRow = (key) => {
    setForm((f) => {
      const copy = { ...f };
      if (key === "experience")
        copy.experience = [...(copy.experience || []), { company: "", position: "", start: "", end: "", desc: "" }];
      if (key === "education")
        copy.education = [...(copy.education || []), { school: "", degree: "", year: "" }];
      if (key === "skills") copy.skills = [...(copy.skills || []), ""];
      return copy;
    });
  };

  const removeRow = (key, idx) => {
    setForm((f) => {
      const copy = { ...f };
      copy[key] = (copy[key] || []).filter((_, i) => i !== idx);
      return copy;
    });
  };

  const handleSave = () => {
    const final = { ...form, updatedAt: new Date().toISOString() };
    onSave(final);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded shadow-lg w-[95%] md:w-3/4 max-h-[90vh] overflow-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {form.type ? `${form.type.toUpperCase()} Editor` : "Document Editor"}
          </h3>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1 border rounded">
              Close
            </button>
            <button onClick={handleSave} className="px-3 py-1 bg-indigo-600 text-white rounded">
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Document Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full border p-2 rounded mb-2"
            />
            <label className="block text-sm font-medium">Job Title / Heading</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full border p-2 rounded mb-2"
            />

            <label className="block text-sm font-medium">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full border p-2 rounded mb-2"
            />

            <label className="block text-sm font-medium">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full border p-2 rounded mb-2"
            />

            <label className="block text-sm font-medium">Summary</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              className="w-full border p-2 rounded mb-2"
              rows={5}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="font-semibold">Experience</div>
              <button onClick={() => addRow("experience")} className="text-sm bg-gray-100 px-2 py-1 rounded">
                Add
              </button>
            </div>

            {(form.experience || []).map((exp, i) => (
              <div key={i} className="border rounded p-2 mb-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => updateField(`experience.${i}.position`, e.target.value)}
                    className="border p-1 rounded"
                  />
                  <input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateField(`experience.${i}.company`, e.target.value)}
                    className="border p-1 rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input
                    placeholder="Start"
                    value={exp.start}
                    onChange={(e) => updateField(`experience.${i}.start`, e.target.value)}
                    className="border p-1 rounded"
                  />
                  <input
                    placeholder="End"
                    value={exp.end}
                    onChange={(e) => updateField(`experience.${i}.end`, e.target.value)}
                    className="border p-1 rounded"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={exp.desc}
                  onChange={(e) => updateField(`experience.${i}.desc`, e.target.value)}
                  className="w-full mt-2 border p-1 rounded"
                />
                <div className="flex justify-end mt-2">
                  {(form.experience || []).length > 1 && (
                    <button onClick={() => removeRow("experience", i)} className="text-sm text-red-600">
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-4 mb-2 flex items-center justify-between">
              <div className="font-semibold">Education</div>
              <button onClick={() => addRow("education")} className="text-sm bg-gray-100 px-2 py-1 rounded">
                Add
              </button>
            </div>

            {(form.education || []).map((ed, i) => (
              <div key={i} className="border rounded p-2 mb-2">
                <input
                  placeholder="Degree"
                  value={ed.degree}
                  onChange={(e) => updateField(`education.${i}.degree`, e.target.value)}
                  className="w-full border p-1 rounded mb-1"
                />
                <input
                  placeholder="Institution"
                  value={ed.school}
                  onChange={(e) => updateField(`education.${i}.school`, e.target.value)}
                  className="w-full border p-1 rounded mb-1"
                />
                <input
                  placeholder="Year"
                  value={ed.year}
                  onChange={(e) => updateField(`education.${i}.year`, e.target.value)}
                  className="w-full border p-1 rounded mb-1"
                />
                <div className="flex justify-end mt-2">
                  {(form.education || []).length > 1 && (
                    <button onClick={() => removeRow("education", i)} className="text-sm text-red-600">
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Skills</div>
                <button onClick={() => addRow("skills")} className="text-sm bg-gray-100 px-2 py-1 rounded">
                  Add
                </button>
              </div>
              <div className="mt-2">
                {(form.skills || []).map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      value={s}
                      onChange={(e) => updateField(`skills.${i}`, e.target.value)}
                      className="flex-1 border p-1 rounded"
                    />
                    {(form.skills || []).length > 1 && (
                      <button onClick={() => removeRow("skills", i)} className="text-sm text-red-600">
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* live preview */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Live Preview</h4>
          <div className="border p-4 rounded bg-gray-50">
            <div style={{ fontFamily: "Arial, sans-serif", color: "#222831" }}>
              <div className="text-center">
                <div className="text-xl font-bold">{form.name}</div>
                <div className="text-sm text-gray-600">{form.title}</div>
                <div className="text-sm text-gray-500">
                  {form.email} • {form.phone}
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-medium text-sm bg-[#76ABAE] inline-block text-white px-2 py-1 rounded">
                  Summary
                </h4>
                <p className="mt-2 text-sm">{form.summary}</p>
              </div>

              <div className="mt-3">
                <h4 className="font-medium text-sm bg-[#76ABAE] inline-block text-white px-2 py-1 rounded">
                  Experience
                </h4>
                {(form.experience || []).map((e, i) => (
                  <div key={i} className="mt-2 text-sm">
                    <div className="font-semibold">
                      {e.position} — {e.company}
                    </div>
                    <div className="text-xs text-gray-500">
                      {e.start} - {e.end}
                    </div>
                    <div className="mt-1">{e.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <h4 className="font-medium text-sm bg-[#76ABAE] inline-block text-white px-2 py-1 rounded">
                  Education
                </h4>
                {(form.education || []).map((e, i) => (
                  <div key={i} className="mt-2 text-sm">
                    <div className="font-semibold">
                      {e.degree} — {e.school}
                    </div>
                    <div className="text-xs text-gray-500">{e.year}</div>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <h4 className="font-medium text-sm bg-[#76ABAE] inline-block text-white px-2 py-1 rounded">
                  Skills
                </h4>
                <ul className="mt-2 grid grid-cols-2 gap-1 text-sm">
                  {(form.skills || []).filter(Boolean).map((sk, i) => (
                    <li key={i}>• {sk}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// very simple printable HTML (can customize later)
function generateTemplateHTML(item) {
  const css = `
    body{font-family:Arial, sans-serif;color:#222831;margin:24px;}
    h1{margin:0;font-size:24px}
    h2{font-size:16px;background:#76ABAE;color:#fff;display:inline-block;padding:2px 8px;border-radius:4px}
    .muted{color:#666}
    .section{margin-top:16px}
    .row{margin:6px 0}
  `;
  const exp = (item.experience || [])
    .map(
      (e) => `
      <div class="row">
        <strong>${e.position || ""}</strong> — ${e.company || ""}<br/>
        <span class="muted">${e.start || ""} - ${e.end || ""}</span><br/>
        <div>${e.desc || ""}</div>
      </div>`
    )
    .join("");
  const edu = (item.education || [])
    .map(
      (e) => `
      <div class="row">
        <strong>${e.degree || ""}</strong> — ${e.school || ""} (${e.year || ""})
      </div>`
    )
    .join("");
  const skills = (item.skills || []).filter(Boolean).map((s) => `• ${s}`).join("  ");

  const html = `
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>${item.name || "Document"}</title>
        <style>${css}</style>
      </head>
      <body>
        <h1>${item.name || ""}</h1>
        <div class="muted">${item.title || ""}</div>
        <div class="muted">${item.email || ""} • ${item.phone || ""}</div>

        <div class="section">
          <h2>Summary</h2>
          <div>${item.summary || ""}</div>
        </div>

        <div class="section">
          <h2>Experience</h2>
          ${exp || "<div class='muted'>—</div>"}
        </div>

        <div class="section">
          <h2>Education</h2>
          ${edu || "<div class='muted'>—</div>"}
        </div>

        <div class="section">
          <h2>Skills</h2>
          <div>${skills || "<span class='muted'>—</span>"}</div>
        </div>
      </body>
    </html>
  `;
  return { html };
}
