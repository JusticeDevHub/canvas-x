import { useState } from "react";
const useVar = () => {
    const [hello, setHello] = useState("Hello");
    return {
        hello,
        setHello,
    };
};
export default useVar;
//# sourceMappingURL=useVar.js.map