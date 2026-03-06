export const TOOLS_FIND_ALL_EXAMPLE = {
  data: [
    {
      id: 3,
      name: "GitHub",
      description: "Version control and collaboration",
      vendor: "GitHub Inc.",
      website_url: "https://github.com",
      category_id: 2,
      monthly_cost: "21",
      active_users_count: 10,
      owner_department: "Engineering",
      status: "active",
      created_at: "2026-03-05T14:24:27.000Z",
      updated_at: "2026-03-05T14:24:27.000Z",
    },
  ],
  meta: {
    total: 24,
    filtered: 2,
    filters_applied: {
      min_cost: 10,
      max_cost: 50,
      category: "Development",
    },
  },
};

export const TOOLS_CREATE_BODY_EXAMPLE = {
  guithub: {
    name: "GitHub",
    vendor: "GitHub Inc.",
    description: "Version control and collaboration",
    website_url: "https://github.com",
    category_id: 2,
    monthly_cost: 21.0,
    owner_department: "Engineering",
    status: "active",
  },
};

export const TOOLS_CREATE_OR_UPDATE_EXAMPLE = {
  data: {
    id: 3,
    name: "GitHub",
    vendor: "GitHub Inc.",
    description: "Version control and collaboration",
    website_url: "https://github.com",
    monthly_cost: 21.0,
    active_users_count: 0,
    owner_department: "Engineering",
    status: "active",
    category: "Development",
    created_at: "2026-03-05T14:24:27.000Z",
    updated_at: "2026-03-05T14:24:27.000Z",
  },
};

export const TOOLS_UPDATE_BODY_EXAMPLE = {
  data: {
    monthly_cost: 7.0,
    status: "deprecated",
    description: "Updated description after renewal",
  },
};
