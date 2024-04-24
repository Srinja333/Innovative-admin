import axios from "axios";

export const fetchTemplates=async()=>{
    let templatesData = [];
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/template`
      );
      templatesData = response.data;
      // console.log(templatesData)
    } catch (error) {
      console.log("err", error);
    } finally {
     return templatesData;
    }
}
export const createTemplates = async (addData) => {
    let tempTemplates = [];
    try {
        console.log("template data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/template`,
                    data: addData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempTemplates = res.data;
            });
    } catch (error) {
        console.log("can not create templates");
    } finally {
        return tempTemplates;
    }
};
export const fetchAllPdfs=async()=>{
    let tempPdfsData = [];
    try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/pdf`
        );
        tempPdfsData = response.data;
      //   console.log("pdf only",tempPdfsData)
      } catch (error) {
        console.log("err", error);
      } finally {
       return tempPdfsData
      }
}
export const fetchAllZips=async()=>{
  let tempZipsData = [];
  try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/zip`
      );
      tempZipsData = response.data;
    //   console.log("pdf only",tempPdfsData)
    } catch (error) {
      console.log("err", error);
    } finally {
     return tempZipsData
    }
}