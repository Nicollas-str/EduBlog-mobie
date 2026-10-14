export interface IPost {
  _id: string;
  title: string;
  summary: string;
  content: string;

  imageUrl?: string | null;
  series?: string | null;
  semester?: string | null;
  isFeatured?: boolean;

  discipline: {
    _id?: string;
    label: string;
  };

  author: {
    _id?: string;
    name: string;
    email?: string;
    username?: string;
  };

  status: {
    _id?: string;
    label: string;
    order?: number;
  };

  createDate: string;
  updateDate?: string;
}
