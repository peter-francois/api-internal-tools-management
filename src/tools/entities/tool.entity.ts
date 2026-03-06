
export enum ToolsOwnerDepartment {
  Engineering= 'Engineering',
  Sales= 'Sales',
  Marketing= 'Marketing',
  HR= 'HR',
  Finance= 'Finance',
  Operations= 'Operations',
  Design= 'Design'
}

export enum ToolsStatus {
  ACTIVE = "active",
  DEPRECATED  = "deprecated",
  TRIAL = "trial",
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

