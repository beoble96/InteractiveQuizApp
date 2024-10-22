//import fs from 'fs';
//import path from 'path';
import Question from '../../../components/Question';
import { useRouter } from 'next/router';
/*
export const getServerSideProps = async ({ params }) => {

  const { filename } = params;

  // If params.filename is undefined, the route is not working correctly
  if (!filename) {
    console.error('No filename passed in the URL');
    return {
      notFound: true, // 404 if no filename is passed
    };
  }

  let filePath;

  // Construct the file path based on the filename
  if (filename === 'history') {
    filePath = path.join(process.cwd(), 'src','pages','data', 'dataHistory.json');
  } else if (filename === 'science') {
    filePath = path.join(process.cwd(), 'src','pages','data', 'dataScience.json');
  } else {
    console.error('Unknown filename:', filename);
    return {
      notFound: true, // 404 if filename is not recognized
    };
  }

  // Log the file path to verify it
  console.log('File path:', filePath);

  try {
    // Try reading the file
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(jsonData);

    return {
      props: {
        questions,
      },
    };
  } catch (error) {
    // Log the error if the file can't be read
    console.error('Error reading file:', error);
    return {
      notFound: true, // 404 if there is an error
    };
  }
};*/

import { useState, useEffect } from 'react';

export default function Questions() {
  const [allquestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setAllQuestions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error: {error}</div>;

  
    const router = useRouter();
  
    // Get the dynamic page path and query
    const currentUrl = router.asPath;
    
  

  return (
    <Question allquestions={allquestions} currentUrl={currentUrl} />
  );
};
