export enum ToolsOwnerDepartment {
  IT = "IT",
  HR = "HR",
  FINANCE = "FINANCE",
  MARKETING = "MARKETING",
  SALES = "SALES",
}

export enum ToolsStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DEPRECATED = "deprecated",
}

export class Tool {
  id: number;
  name: string;
  description?: string;
  vendor?: string;
  websiteUrl?: string;
  categoryId: number;
  monthlyCost: number;
  activeUsersCount: number;
  ownerDepartment: ToolsOwnerDepartment;
  status?: ToolsStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
