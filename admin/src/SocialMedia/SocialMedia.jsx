import React, { useState } from "react";
import axios from "axios";

const SocialMedia = () => {
  const api = "https://backend.aashayeinjudiciary.com/social";
  const [formData, setFormData] = useState({
    icon: "",
    url: "",
    altText: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(api, formData);
      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        icon: "",
        url: "",
        altText: "",
      });
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Social Media Link</h2>

      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          Social link created successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="icon">
            Social Platform
          </label>
          <select
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={(e) => {
              const val = e.target.value;
              setFormData((prev) => ({
                ...prev,
                icon: val,
                ...(prev.altText?.trim() ? {} : { altText: `Follow us on ${val.charAt(0).toUpperCase()}${val.slice(1)}` }),
              }));
            }}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">-- Select Platform --</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="youtube">YouTube</option>
            <option value="pinterest">Pinterest</option>
            <option value="tiktok">TikTok</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
            <option value="github">GitHub</option>
            <option value="reddit">Reddit</option>
            <option value="discord">Discord</option>
            <option value="twitch">Twitch</option>
            <option value="snapchat">Snapchat</option>
            <option value="medium">Medium</option>
            <option value="quora">Quora</option>
            <option value="dribbble">Dribbble</option>
            <option value="behance">Behance</option>
            <option value="stackoverflow">Stack Overflow</option>
            <option value="vimeo">Vimeo</option>
            <option value="skype">Skype</option>
            <option value="slack">Slack</option>
            <option value="google">Google</option>
            <option value="apple">Apple</option>
            <option value="spotify">Spotify</option>
            <option value="soundcloud">SoundCloud</option>
            <option value="weixin">WeChat</option>
            <option value="weibo">Weibo</option>
            <option value="vk">VK</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="url">
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="altText">
            Alt Text (Description)
          </label>
          <input
            type="text"
            id="altText"
            name="altText"
            value={formData.altText}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white ${
            loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Creating..." : "Create Social Link"}
        </button>
      </form>
    </div>
  );
};

export default SocialMedia;
