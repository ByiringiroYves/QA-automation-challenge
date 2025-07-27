import React, { useState, useEffect, createContext, useContext } from 'react';

// Create a context for authentication and user data
const AuthContext = createContext(null);
const UserContext = createContext(null);

// --- Utility Functions (Simulated API Calls) ---
const simulateApiCall = (data, delay = 500) => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

// Dummy users data
let dummyUsers = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
];

// --- Login Component ---
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!username || !password) {
      setError('Please enter both username and password.'); 
      return; 
    }


    // Simulate API call for login
    const response = await simulateApiCall({
      success: username === 'test' && password === 'password123',
      message: username === 'test' && password === 'password123' ? 'Login successful' : 'Invalid credentials'
    }, 1000); // Simulate 1 second delay

    if (response.success) {
     // setError(''); 
      login({ username });
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-sans">
      {/* Top Bar with REMWASTE Account */}
      <div className="absolute top-0 left-0 w-full p-4 bg-white border-b border-gray-200 flex justify-between items-center px-8">
        <span className="text-lg font-semibold text-gray-800">REMWASTE Account</span>
        {/* Language selector - simplified for now */}
        <div className="text-sm text-gray-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M3 9h12M3 13h12M17 5l-2 2 2 2M17 9l-2 2 2 2M17 13l-2 2 2 2M21 5l-2 2 2 2M21 9l-2 2 2 2M21 13l-2 2 2 2" />
          </svg>
          Language: English <span className="ml-1">&#9660;</span>
        </div>
      </div>

      <div className="bg-white p-8 pt-12 rounded-lg shadow-md w-full max-w-md mt-16 border border-gray-200">
        {/* REMWASTE Gov Logo/Text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black-700">REMWASTE <span className="text-gray-800">.com</span></h1>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Sign in with REMWASTE Account</h2>
        <p className="text-center text-gray-600 mb-6 text-sm">Please enter your details to continue to <span className="font-medium text-blue-700">REMWASTE Admin</span>.</p>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                placeholder="Enter your password"
                required
              />
              {/* Eye icon - simplified, could add functionality to toggle visibility */}
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
            </div>
            <div className="text-right mt-2">
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
          >
            Sign In
          </button>

          {/* Terms of Use and Privacy Policy */}
          <p className="text-center text-xs text-gray-500 mt-4">
            By logging-in, you accept the new <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Terms of use</a> including <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Privacy Policy</a> of REMWASTE Account.
          </p>

          {/* Don't have an account? Create Account */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Create Account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

// --- UserForm Component (for Add/Edit) ---
const UserForm = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [role, setRole] = useState(user ? user.role : 'User');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Always clear previous error *before* new validation, but only if it's not the initial render.
    // This is a common pattern to ensure fresh validation feedback.
    //setError(''); // Clear at the very start of submission attempt
    

    if (!name || !email) {
      setError('Name and Email are required.');
      return;
    }

    // setError('');

    const newUser = {
      id: user ? user.id : String(Date.now()), // Simple ID generation
      name,
      email,
      role,
    };
    onSave(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{user ? 'Edit User' : 'Add New User'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
        {/* This div will render if 'error' has content, otherwise it will be empty but visible */}
          <div
            data-testid="user-form-error-message"
            role="alert"
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm"
          >
            <span className="block sm:inline">{error}</span> {/* This span will render the error text or be empty */}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="User's name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="User's email"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {user ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- UserList Component ---
const UserList = () => {
  const { logout } = useContext(AuthContext);
  const { users, addUser, updateUser, deleteUser } = useContext(UserContext);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSaveUser = async (user) => {
    setMessage('');
    setIsError(false);
    try {
      if (user.id && dummyUsers.find(u => u.id === user.id)) {
        await simulateApiCall({ success: true }, 500); // Simulate update API
        updateUser(user);
        setMessage('User updated successfully!');
      } else {
        await simulateApiCall({ success: true }, 500); // Simulate add API
        addUser(user);
        setMessage('User added successfully!');
      }
    } catch (err) {
      setMessage('Operation failed.');
      setIsError(true);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    setMessage('');
    setIsError(false);
    try {
      if (userToDelete) {
        await simulateApiCall({ success: true }, 500); // Simulate delete API
        deleteUser(userToDelete.id);
        setMessage('User deleted successfully!');
      }
    } catch (err) {
      setMessage('Deletion failed.');
      setIsError(true);
    } finally {
      setShowConfirmModal(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Top Bar - User Management Title */}
      <div className="absolute top-0 left-0 w-full p-4 bg-white border-b border-gray-200 flex justify-between items-center px-8">
        <h2 className="text-xl font-semibold text-gray-800">REMWASTE User Management</h2>
        <button
          onClick={logout}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-20"> {/* Added mt-20 to push content below top bar */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Users</h3>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add User
          </button>
        </div>

        {message && (
          <div className={`px-4 py-3 rounded-md mb-4 ${isError ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`} role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddUserModal && (
        <UserForm onClose={() => setShowAddUserModal(false)} onSave={handleSaveUser} />
      )}

      {editingUser && (
        <UserForm user={editingUser} onClose={() => setEditingUser(null)} onSave={handleSaveUser} />
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete user "{userToDelete?.name}"?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={cancelDelete}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// --- Main App Component ---
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Simulate initial data load
  useEffect(() => {
    const loadUsers = async () => {
      const data = await simulateApiCall(dummyUsers, 300);
      setUsers(data);
    };
    loadUsers();
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className="font-sans antialiased text-gray-900">
      {/* Tailwind CSS CDN */}

      <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
        <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
          {isAuthenticated ? <UserList /> : <LoginPage />}
        </UserContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
