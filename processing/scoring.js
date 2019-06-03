class Scoring {
  constructor() {
    this.declare();
  }

  /*
   * ====================================================================
   *   DECLARE SECTION
   * ====================================================================
   */

  declare() {
    this.frameStatusOpen = "open";
    this.frameStatusStrike = "strike";
    this.frameStatusSpare = "spare";
    this.frameStatusTenth = "tenthFrame";
    this.framePendingScore = "pending";
    this.ballsThrownOpenSpareFrame = 2;
    this.ballsThrownStrikeFrame = 1;
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

  /*
   * ====================================================================
   *   PRIVATE METHODS
   * ====================================================================
   */

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
      this.frameStatus = this.frameStatusOpen;
      if (
        this.frameScore === this.strike &&
        this.ballValues.length === this.ballsThrownStrikeFrame
      )
        this.frameStatus = this.frameStatusStrike;
      else if (
        this.frameScore === this.strike &&
        this.ballValues.length === this.ballsThrownOpenSpareFrame
      )
        this.frameStatus = this.frameStatusSpare;
    } else {
      this.frameStatus = this.frameStatusTenth;
    }
    if (
      this.frameStatus === this.frameStatusStrike ||
      this.frameStatus === this.frameStatusSpare
    )
      this.frameScore = this.framePendingScore;
  }

  calcRunningTotal(lastRunningTotal) {
    let newRunningTotal;
    if (
      this.frameStatus === this.frameStatusOpen ||
      this.frameStatus === this.frameStatusTenth
    ) {
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
    if (frameNo === 0)
      return { frameScore: 0, runningTotal: 0, status: null, totalThrows: 0 };
    const frameIndex = frameNo - 1;
    return this.scores[frameIndex];
  }

  amendFrameScoreAttributes(frameNo, newAttributeValues) {
    const frameIndex = frameNo - 1;
    this.scores[frameIndex] = newAttributeValues;
  }

  /**
   * -----------------------------------------------------------------------
   * Calculate the score for the past pending frames  - strike and spare
   * and update the running total
   * ----------------------------------------------------------------------
   */
  calcPendingFrames() {
    const firstFrame = 1;
    const secondFrame = 2;
    let backFrame = 1;
    let carriedForwardTotal;

    if (this.frameCount === firstFrame) return;
    if (this.frameCount > secondFrame) backFrame = 2;

    for (
      let frameNo = this.frameCount - backFrame;
      frameNo < this.frameCount;
      frameNo++
    ) {
      let ballsThrownInFrame = this.ballsThrownOpenSpareFrame;
      let {
        frameScore,
        runningTotal,
        status,
        totalThrows
      } = this.getFrameScoreAttributes(frameNo);
      if (frameScore !== this.framePendingScore) continue;
      const bonusThrows = this.frameStatusMapping[status];
      if (status === this.frameStatusStrike)
        ballsThrownInFrame = this.ballsThrownStrikeFrame;

      const countedBallValues = this.getAccumBallValues.slice(
        totalThrows - ballsThrownInFrame,
        totalThrows + bonusThrows
      );

      if (!carriedForwardTotal) carriedForwardTotal = runningTotal;

      if (countedBallValues.length < bonusThrows + 1) {
        // We have not thrown enough bonus balls to be able to calculate the score for this past frame
        // We just need to carry forward the running total from the previous frame
        runningTotal = carriedForwardTotal;
      } else {
        // We have enough bonus balls to calculate the score for this frame
        // We also need to ensure that the newly calculated runningTotal is carried forward
        // to the later frames
        frameScore = countedBallValues.reduce((acc, curVal) => acc + curVal);
        runningTotal = carriedForwardTotal + frameScore;
        carriedForwardTotal = runningTotal;
      }

      this.amendFrameScoreAttributes(frameNo, {
        frameScore,
        runningTotal,
        status,
        totalThrows
      });
    }
  }

  /**
   * ------------------------------------------------------------------
   * Build the frame score record set and push it to the accumulation
   *  scores array **this.scores**
   * ------------------------------------------------------------------
   */
  buildFrameScore() {
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

  /*
   * ====================================================================
   *   SETTERS
   * ====================================================================
   */

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

  /*
   * ====================================================================
   *   GETTERS
   * ====================================================================
   */

  get getScores() {
    return this.scores;
  }

  get getBallValues() {
    return this.ballValues;
  }

  get getAccumBallValues() {
    return this.accumBallValues;
  }

  /*
   * ====================================================================
   *   PUBLIC METHODS
   * ====================================================================
   */

  doScoring() {
    this.parseResultSet();
    this.buildBallValues();
    this.calcFrameStatusScore();
    this.calcPendingFrames();
    this.buildFrameScore();
  }
}

module.exports = Scoring;
