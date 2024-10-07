const parseArgs = () => {
  const args = process.argv.slice(2);

  const result = args
    .reduce((acc, arg, index) => {
      if (arg.startsWith("--")) {
        acc.push(`${arg.slice(2)} is ${args[index + 1]}`);
      }
      return acc;
    }, [])
    .join(", ");
  console.log(result);
};

parseArgs();
