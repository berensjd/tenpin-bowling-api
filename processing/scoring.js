class Scoring {
  constructor() {
    this.totalFrames = 10;
    this.totalPins = 10;
    this.strike = this.totalPins;
    this.spareBonusThrow = 1;
    this.strikeBonusThrow = 2;
    this.openBonusThrow = 0;
    this.resultSymbolMapping = {
      X: () => this.strike,
      F: () => 0,
      "-": () => 0,
      "/": value => this.totalPins - value,
      " ": () => 0
    };
    this.frameStatusMapping = {
      strike: this.strikeBonusThrow,
      spare: this.spareBonusThrow,
      open: this.openBonusThrow
    };
  }

  /**
   * -------------------------------------------------------------------
   * Transform a result symbol to a numerical ball trow value
   * @param {*} resultSymbol
   * @param {*} previousThrowValue
   * -------------------------------------------------------------------
   */
  resultSymbolToValue(resultSymbol, previousThrowValue = 0) {
    return this.resultSymbolMapping[resultSymbol](previousThrowValue);
  }

  /**
   * --------------------------------------------------------------------
   * Validates the frame result agains the total number of availble pins
   * -------------------------------------------------------------------
   */
  validatePinValue() {
    let totalValue = 0;
    for (this.throw of this.frameResult) {
      if (!(this.throw in this.resultSymbolMapping))
        totalValue = totalValue + parseInt(this.throw);
    }
    if (totalValue > this.totalPins) return false;
    else return true;
  }

  /**
   * --------------------------------------------------------------------
   * Parses the result set on the frame  - **this.frameResult**
   * into corresponding throw values  - **this.ballValues**
   * -------------------------------------------------------------------
   */
  parseResultSet() {
    let lastThrowValue = 0;
    let throws = [];
    for (this.throw of this.frameResult) {
      if (this.throw in this.resultSymbolMapping) {
        throws.push(this.resultSymbolToValue(this.throw, lastThrowValue));
      } else {
        throws.push(parseInt(this.throw));
      }
      if (throws.length >= 1) lastThrowValue = throws[throws.length - 1];

      // With the exception of the 10th Frame
      //Ensure a strike score one strike value in the array - [10]
      if (
        throws.length === 1 &&
        throws[0] === this.strike &&
        this.frameCount < this.totalFrames
      )
        break;
    }
    this.ballValues = throws;
  }

  /**
   * --------------------------------------------------------------------
   *  Calculate the frame status - **this.frameStatus**
   * and frame score  - **this.frameScore**
   * Possible values - open / strike /spare /tenthFrame
   * --------------------------------------------------------------------
   */
  calcFrameStatusScore() {
    this.frameScore = this.ballValues.reduce((acc, curVal) => acc + curVal);
    if (this.frameCount < this.totalFrames) {
      this.frameStatus = "open";
      if (this.frameScore === this.strike && this.ballValues.length === 1)
        this.frameStatus = "strike";
      else if (this.frameScore === this.strike && this.ballValues.length === 2)
        this.frameStatus = "spare";
    } else {
      this.frameStatus = "tenthFrame";
    }
    if (this.frameStatus === "strike" || this.frameStatus === "spare")
      this.frameScore = "pending";
  }

  calcRunningTotal(lastRunningTotal) {
    let newRunningTotal;
    if (this.frameStatus === "open") {
      newRunningTotal = lastRunningTotal + this.frameScore;
    } else {
      newRunningTotal = lastRunningTotal;
    }
    return newRunningTotal;
  }

  /**
   * ----------------------------------------------------------------------
   * Push the ball values for the current frame into the accumulation array
   * ----------------------------------------------------------------------
   */
  buildBallValues() {
    this.accumBallValues = [...this.accumBallValues, ...this.ballValues];
  }

  getFrameScoreAttributes(frameNo) {
    if (frameNo === 0) return { runningTotal: 0 };
    const frameIndex = frameNo - 1;
    return this.scores[frameIndex];
  }

  //+ ToDo
  //Create method to amend the currentFrameScore -2
  // Create method to amend the currentFrameScore -1

  /**
   * ------------------------------------------------------------------
   * Build the frame score record set and push it to the accumulation
   *  scores array **this.scores**
   * ------------------------------------------------------------------
   */
  buildFrameScore() {
    //Do we need to update the last frame score
    /*
    if (this.frameCount > 1) {
      const { frameScore, runningTotal, status } = this.scores[
        this.scores.length - 1
      ];
      const bonusBalls = this.frameStatusMapping[status];
    } else {
      lastRunningTotal = 0;
    }
    */

    // Get the score attributes from the last frame
    const { runningTotal: lastRunningTotal } = this.getFrameScoreAttributes(
      this.frameCount - 1
    );

    const frameScoreRecordSet = {
      frameScore: this.frameScore,
      runningTotal: this.calcRunningTotal(lastRunningTotal),
      status: this.frameStatus,
      totalThrows: this.accumBallValues.length
    };
    this.scores.push(frameScoreRecordSet);
  }

  set frame(frameNo) {
    this.frameCount;
  }

  set setFrameResult(balls) {
    this.frameResult = balls.toLocaleUpperCase();
  }

  set setScores(scores) {
    this.scores = scores;
    this.frameCount = this.scores.length + 1;
  }

  set setAccumBallValues(values) {
    this.accumBallValues = values;
  }

  get getScores() {
    return this.scores;
  }

  get getBallValues() {
    return this.ballValues;
  }

  get getAccumBallValues() {
    return this.accumBallValues;
  }
  doScoring() {
    this.parseResultSet();
    this.buildBallValues();
    this.calcFrameStatusScore();
    this.buildFrameScore();
  }
}

module.exports = Scoring;
