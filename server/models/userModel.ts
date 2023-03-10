import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User ID required."],
    unique: true,
    immutable: true,
  },
  name: {
    type: String,
    required: [true, "Name required."],
  },
  email: {
    type: String,
    required: [true, "Email required."],
    unique: true,
    lowercase: true,
    immutable: true,
  },
  title: {
    type: String,
  },
  location: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  contact_email: {
    type: String,
  },
  picture: {
    type: String,
    default: "default-user.jpg",
  },
  website: {
    type: String,
  },
  backdrop: {
    type: String,
    default: "default-backdrop.jpg",
  },
  summary: {
    type: String,
  },
  resume: {
    type: String,
  },
  coverLetter: {
    type: String,
  },
  outgoingRequests: [{ type: String, ref: "User", unique: true }],
  incomingRequests: [{ type: String, ref: "User", unique: true }],
  connections: [
    {
      type: String,
      ref: "User",
      unique: true,
    },
  ],
  projects: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      startDate: {
        type: String,
      },
      endDate: {
        type: String,
      },
      technologies: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
  ],
  skills: [
    {
      name: {
        type: String,
      },
      level: {
        type: String,
      },
    },
  ],
  experience: [
    {
      company: {
        type: String,
      },
      logo: {
        type: String,
      },
      title: {
        type: String,
      },
      location: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
      },
      logo: {
        type: String,
      },
      degree: {
        type: String,
      },
      location: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      description: {
        type: String,
      },
    },
  ],
  languages: [
    {
      name: {
        type: String,
      },
      level: {
        type: String,
      },
    },
  ],
  awards: [
    {
      title: {
        type: String,
      },
      date: {
        type: Date,
      },
      awarder: {
        type: String,
      },
      summary: {
        type: String,
      },
    },
  ],
  courses: [
    {
      title: {
        type: String,
      },
      number: {
        type: String,
      },
      school: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      description: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
