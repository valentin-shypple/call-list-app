const fetchCallList = async (
  dateStart: string,
  dateEnd: string,
  inOut: number | string,
  sortBy: "date" | "duration" | "",
  order: "ASC" | "DESC" | "",
  offset: number
) => {
  const authHeaders: HeadersInit = {
    Authorization: `Bearer testtoken`,
    "Content-Type": "application/json",
  };

  let queryStr = `https://api.skilla.ru/mango/getList?date_start=${dateStart}&date_end=${dateEnd}`;
  if (inOut) {
    queryStr = queryStr + `&in_out=${inOut}`;
  }
  if (sortBy) {
    queryStr = queryStr + `&sort_by=${sortBy}`;
  }
  if (order) {
    queryStr = queryStr + `&order=${order}`;
  }
  if (offset) {
    queryStr = queryStr + `&offset=${offset}`;
  }

  const req = new Request(queryStr, {
    method: "POST",
    headers: authHeaders,
  });

  const res = await fetch(req);

  if (!res) {
    throw new Error(res);
  }

  return {
    data: await res.json(),
  };
};

export { fetchCallList };
