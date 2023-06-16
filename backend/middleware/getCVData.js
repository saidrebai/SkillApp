

// const dimensions = async (result, dataToSearch) => {
//   if (!result || !result.Lines) {
//     throw new Error("Invalid Textract result object");
//   }

//   const line = result.Lines.find((line) =>
//     line.LineText.toUpperCase().includes(dataToSearch.toUpperCase())
//   );

//   if (!line) {
//     throw new Error(`Cannot find line containing '${dataToSearch}'`);
//   }

//   return {
//     DimensionTop: line.Words[0].Top,
//     DimensionLeft: line.Words[0].Left,
//   };
// };

const getCVData = async (result, ) => {
  const wordsToExtract = ["JavaScript", "Python","BASH","linux","Html","Css","Docker","Devops","mySQL","MySQL","Wordpress","Php","SQL","php","PHP",
"javaScript","js","Js","python","bash","Bash","Linux","LINUX","HTML","html","HTML5","CSS","docker","DOCKER","devops","DevOps","wordpress",
"kubernetes","Kubernetes","Laravel","laravel","LARAVEL","wordPress","WordPress"];
  try {
    const relevantData = {
      skills: [],
    };

    result.Lines.forEach((line) => {
      const words = line.LineText.trim().split(/[ ,]+/);
      wordsToExtract.forEach((word) => {
        if (words.includes(word)) {
          relevantData.skills.push(word);
        }
      });
    });

    console.log(relevantData);
    return relevantData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


module.exports = getCVData;
