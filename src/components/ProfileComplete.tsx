import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../lib/apiInstance";

export default function ProfileComplete() {
  const auth = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [fecNac, setFecNac] = useState("");
  const [genero, setGenero] = useState("");

  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [cargo, setCargo] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/user/profile", {
        nombre,
        apellido,
        dni,
        fecNac,
        genero,
        ciudad,
        telefono,
        direccion,
        cargo
      },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      alert("Profile completed successfully!");
    } catch (error) {
      console.error("Profile completion failed", error);
      alert("Profile completion failed. Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">DNI</label>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={fecNac}
              onChange={(e) => setFecNac(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Genero</label>
              <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div>
            <label className="block text-gray-700">City</label>
            <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div>
            <label className="block text-gray-700">Position</label>
            <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}