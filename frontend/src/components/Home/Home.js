import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const typingSpeed = 100;
  const [urlError, setUrlError] = useState("");
  const navigate = useNavigate();
  const placeholderTexts = ["Enter the URL here", "Enter URL to webscrape"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openCheckboxSnackbar, setOpenCheckboxSnackbar] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    selectAll: false,
    rabinKarp: false,
    suffixTree: false,
    suffixArray: false,
    naiveStringMatching: false,
    kmpAlgorithm: false,
  });

  const [loadingSteps, setLoadingSteps] = useState([
    "Scraping website...",
    "Extracting data...",
    "Filtering data...",
    "Removing stopwords...",
    "Runnning algorithms...",
    "Counting words...",
    "Generating word cloud...",
    "Almost reached...",
    // Add more steps as needed
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleOpenCheckboxSnackbar = () => {
    setOpenCheckboxSnackbar(true);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason, type) => {
    if (reason === "clickaway") {
      return;
    }
    if (type === "inputError") {
      setOpenSnackbar(false);
    } else if (type === "checkboxError") {
      setOpenCheckboxSnackbar(false);
    }
  };

  const customFontStyle = {
    fontFamily: "Roboto, sans-serif",
    fontSize: "24px",
    color: "black", // You can choose your preferred color
    fontWeight: "normal", // You can use 'normal' or 'bold' as per your preference
  };

  useEffect(() => {
    let stepIndex = 0;

    const showNextStep = () => {
      setCurrentStep(stepIndex);
      stepIndex = (stepIndex + 1) % loadingSteps.length;
    };

    const interval = setInterval(showNextStep, 2000); // Change the interval duration as needed

    showNextStep(); // Show the first step immediately

    return () => {
      clearInterval(interval);
    };
  }, [loadingSteps]);

  useEffect(() => {
    let currentIndex = 0;
    let interval;

    if (!inputValue) {
      interval = setInterval(() => {
        if (currentIndex <= placeholderTexts[placeholderIndex].length) {
          setAnimatedPlaceholder(
            placeholderTexts[placeholderIndex].substring(0, currentIndex)
          );
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setAnimatedPlaceholder("");
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % 2);
          }, 2000); // Wait 2 seconds before switching to the next placeholder
        }
      }, typingSpeed);
    } else {
      setAnimatedPlaceholder(""); // Reset the animated placeholder if there's user input
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [placeholderIndex, inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (urlError) {
      setUrlError("");
    }
  };

  const postString = async () => {
    event.preventDefault();

    if (!inputValue.trim()) {
      handleOpenSnackbar();
      return;
    }

    const selectedCheckboxes = Object.keys(checkboxValues)
      .filter((key) => checkboxValues[key])
      .map((key) => key);

    if (selectedCheckboxes.length === 0) {
      handleOpenCheckboxSnackbar();
      return;
    }

    if (!validateUrl(inputValue.trim())) {
      setUrlError("Please enter a valid URL");
      return;
    } else {
      setUrlError("");
    }

    try {
      setIsLoading(true);

      const selectedCheckboxes = Object.keys(checkboxValues)
        .filter((key) => checkboxValues[key])
        .map((key) => key);

      const dataToSend = {
        data: inputValue,
        selectedCheckboxes,
      };

      const response = await axios.post("http://127.0.0.1:5000/", dataToSend);
      localStorage.setItem("responseData", JSON.stringify(response.data));
      navigate("/main");
    } catch (error) {
      console.error("Error posting string:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "selectAll") {
      const newValues = {
        selectAll: checked,
        rabinKarp: checked,
        suffixTree: checked,
        suffixArray: checked,
        naiveStringMatching: checked,
        kmpAlgorithm: checked,
      };
      setCheckboxValues(newValues);
    } else {
      setCheckboxValues({
        ...checkboxValues,
        [name]: checked,
        selectAll: false,
      });
    }
  };

  const clearInputAndCheckboxes = () => {
    setInputValue("");
    setUrlError("");
    setCheckboxValues({
      selectAll: false,
      rabinKarp: false,
      suffixTree: false,
      suffixArray: false,
      naiveStringMatching: false,
      kmpAlgorithm: false,
    });
  };

  const validateUrl = (url) => {
    const urlRegex =
      /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/;
    return urlRegex.test(url);
  };

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress style={{ margin: "20px", marginBottom: "30px" }} />
      <Typography variant="h6">{loadingSteps[currentStep]}</Typography>
    </div>
  ) : (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 1600,
            height: 600,
          },
        }}
      >
        <Paper elevation={24}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              variant="standard"
              size="small"
              fullWidth
              InputProps={{
                style: {
                  fontSize: "30px",
                  marginTop: "30px", // Add margin on top
                  borderBottom: "3px solid black",
                },
              }}
              inputProps={{
                style: {
                  textAlign: "center", // Center-align the placeholder text
                },
              }}
              value={inputValue}
              onChange={handleInputChange}
              placeholder={animatedPlaceholder}
              error={urlError !== ""}
              helperText={urlError}
              FormHelperTextProps={{
                style: { fontSize: "1.25rem" }, // Increase the font size as needed
              }}
            />

            <div className="checkbox">
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  id="opt2"
                  name="rabinKarp"
                  checked={checkboxValues.rabinKarp}
                  className="large-checkbox"
                  onChange={handleCheckboxChange}
                />
                <label className="clable" htmlFor="opt2">
                  <h3>Rabin-Karp</h3>
                </label>
              </div>
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  id="opt3"
                  name="suffixTree"
                  checked={checkboxValues.suffixTree}
                  className="large-checkbox"
                  onChange={handleCheckboxChange}
                />
                <label className="clable" htmlFor="opt3">
                  <h3>Suffix Tree</h3>
                </label>
              </div>
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  id="opt4"
                  name="suffixArray"
                  checked={checkboxValues.suffixArray}
                  className="large-checkbox"
                  onChange={handleCheckboxChange}
                />
                <label className="clable" htmlFor="opt4">
                  <h3>Suffix Array</h3>
                </label>
              </div>
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  id="opt5"
                  name="naiveStringMatching"
                  checked={checkboxValues.naiveStringMatching}
                  className="large-checkbox"
                  onChange={handleCheckboxChange}
                />
                <label className="clable" htmlFor="opt5">
                  <h3>Naive String Matching</h3>
                </label>
              </div>
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  id="opt6"
                  name="kmpAlgorithm"
                  checked={checkboxValues.kmpAlgorithm}
                  className="large-checkbox"
                  onChange={handleCheckboxChange}
                />
                <label className="clable" htmlFor="opt6">
                  <h3>KMP algorithm</h3>
                </label>
              </div>
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  id="opt1"
                  name="selectAll"
                  checked={checkboxValues.selectAll}
                  className="large-checkbox"
                  onChange={handleCheckboxChange}
                />
                <label className="clable" htmlFor="opt1">
                  <h3>Select All</h3>
                </label>
              </div>
            </div>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                marginTop: "20px",
                fontSize: "1.25rem",
                padding: "15px 40px",
              }}
              onClick={() => {
                postString();
              }}
            >
              ANALYZE
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                marginTop: "20px",
                fontSize: "1.25rem",
                padding: "15px 40px",
              }}
              onClick={clearInputAndCheckboxes}
            >
              REFRESH
            </Button>
          </form>
        </Paper>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ marginBottom: 4 }}
      >
        <Alert
          onClose={(event, reason) =>
            handleCloseSnackbar(event, reason, "inputError")
          }
          severity="error"
          sx={{ width: "100%" }}
        >
          Text cannot be empty!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openCheckboxSnackbar}
        autoHideDuration={4000}
        onClose={(event, reason) =>
          handleCloseSnackbar(event, reason, "checkboxError")
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ marginBottom: 4 }}
      >
        <Alert
          onClose={(event, reason) =>
            handleCloseSnackbar(event, reason, "checkboxError")
          }
          severity="error"
          sx={{ width: "100%" }}
        >
          Please select at least one algorithm!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
