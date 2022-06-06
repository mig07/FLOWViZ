import { useState } from "react";

export default function useNavBar() {
  const [drawerList, setDrawerList] = useState([]);

  const onChangeDrawerList = (list) => {
    setDrawerList(list);
  };

  console.log(drawerList);

  return [drawerList, onChangeDrawerList];
}
