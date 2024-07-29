import axios from "axios";
import { useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // const res = await axios(`https://api-ssl.bitly.com/v4/shorten=${inputValue}`);
    //   setShortenLink(res.data.result.full_short_link);
    // } catch(err) {
    //   setError(err);
    // } finally {
    //   setLoading(false);
    setLoading(true);
    const res = await axios.post(
      'https://api-ssl.bitly.com/v4/shorten',
      { long_url: inputValue },
      {
        headers: {
          'Authorization': `Bearer 67e8791b82f62efa5453e0694f8ed8e9aa095528`,
          'Content-Type': 'application/json'
        }
      }
    );
    setShortenLink(res.data.link);
  } catch (err) {
    setError(true);
  } finally {
    setLoading(false);
    }
  }

  useEffect(() => {
    if(inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if(loading) {
    return <p className="noData">Loading...</p>
  }
  if(error) {
    return <p className="noData">Something went wrong :(</p>
  }


  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <CopyToClipboard
            text={shortenLink}
            onCopy={() => setCopied(true)}
          >
            <button className={copied ? "copied" : ""}>Copy to Clipboard</button>
          </CopyToClipboard>
        </div>
      )}
    </>
  )
}

export default LinkResult