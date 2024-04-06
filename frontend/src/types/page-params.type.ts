type PageParams<T = unknown> = {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default PageParams;
