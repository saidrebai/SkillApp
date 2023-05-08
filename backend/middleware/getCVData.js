const dimensions = async (result, dataToSearch) => {
    if (!result || !result.Lines) {
      throw new Error("Invalid Textract result object");
    }
  
    const line = result.Lines.find(line =>
      line.LineText.toUpperCase().startsWith(dataToSearch)
    );
  
    if (!line) {
      throw new Error(`Cannot find line starting with '${dataToSearch}'`);
    }
  
    return {
      DimensionTop: line.Words[0].Top,
      DimensionLeft: line.Words[0].Left,
    };
  };
  
  const getCVData = async (result) => {
    try {
      const dimensionsName = await dimensions(result, "LANGUAGES");
      const dimensionsSkills = await dimensions(result, "PRINCIPALES COMPÉTENCES");
      
      const relevantLines = result.Lines.slice(1).filter(line =>
        line.Words[0].Top > dimensionsSkills.DimensionTop &&
        line.Words[0].Left < dimensionsSkills.DimensionLeft && 
        line.Words[0].Top < dimensionsName.DimensionTop
      );
  
      const lines = relevantLines.map(line => line.LineText.trim());
      const skills = lines.map(line => line.split(",")).flat();
      
  
  
      
      const relevantData = {
        skills,
      };
  
      console.log(relevantData);
      return relevantData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
  module.exports = getCVData;
  