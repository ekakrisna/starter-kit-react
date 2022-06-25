import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";

const useUpdateQueryStringFromObjectChange = (object) => {
  const { pathname, search } = useLocation();
  const keys = Object.keys(object).map((key) => key);

  const navigate = useNavigate();

  const currentSearch = qs.parse(search);

  useEffect(() => {
    const searches = { ...currentSearch };

    Object.keys(object).forEach((key) => {
      if (keys.includes(key)) {
        delete searches[key];
        const current = object[key];
        if (["string", "number"].includes(typeof current) && !!current) {
          searches[key] = current;
        }
        if (Array.isArray(current) && current.length > 0) {
          searches[key] = current.join(",");
        }
      }
    });

    navigate({
      pathname,
      search: qs.stringify(searches),
    });
  }, [object]);
};

export default useUpdateQueryStringFromObjectChange;
