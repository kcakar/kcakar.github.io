/*  eslint-disable no-unused-vars*/
import React from 'react';
import {render} from 'react-dom';

import {Theme,TextField,Button,Card,CardMedia,CardPrimary,CardTitle,CardSubtitle,CardSupportingText,CardActions,CardAction} from 'rmwc';
import colors from '../colors';
import images from '../images';
import language from '../Language';
import '../css/Game.css';


const questionTypes={
    "written":0,
    "test":1,       
}

class Game extends React.Component{

    

    constructor(){
        super();

        this.state={
            gameProgress:0,
            totalQuestionCount:20,
            succeedScreen:false,
            failScreen:false,
            isError:false,
            questions:[],
            currentQuestion:{},
            colorWeight:200,
            rightImage:1,
            wrongImage:1
        }
        
        this.randomlyPickWords=this.randomlyPickWords.bind(this);
        this.startGame=this.startGame.bind(this);
        this.handleAnswer=this.handleAnswer.bind(this);
        this.checkAnswer=this.checkAnswer.bind(this);
        this.skipQuestion=this.skipQuestion.bind(this);
        this.nextQuestion=this.nextQuestion.bind(this);
        this.renderQuestion=this.renderQuestion.bind(this);
        this.renderSummary=this.renderSummary.bind(this);
        this.renderWrittenQuestion=this.renderWrittenQuestion.bind(this);
        this.restart=this.restart.bind(this);
    }
    
    componentWillMount(){
        this.startGame();
    }

    startGame(){
        const gameWords = this.randomlyPickWords();
        const questions=this.generateQuestions(gameWords);
        
        this.setState({currentQuestion:questions[0],questions:questions});
    }

    restart(){
        const gameWords = this.randomlyPickWords();
        const questions=this.generateQuestions(gameWords);
        
        this.setState({
            gameProgress:0,
            succeedScreen:false,
            failScreen:false,
            isError:false,
            questions:questions,
            currentQuestion:questions[0]
        })
    }

    randomlyPickWords(){
        let wordPool = this.objectToArray(this.props.words);
        let size=this.state.totalQuestionCount;
        let gameWords=[];

        if(size > wordPool.length)
        {
            size = wordPool.length;
        }
        for(let i=0;i<size;i++){
            const index = this.getRandomIndex(wordPool);
            gameWords.push(wordPool[index]);
            wordPool.splice(index, 1);
        }
        return gameWords;
    }
    
    getRandomIndex(array){
        return Math.floor(Math.random()*array.length)
    }

    objectToArray(obj){
        const arr=[];
        const objKeys=Object.keys(obj);

        for(let i=0;i<objKeys.length;i++){
            let word={...obj[objKeys[i]]};
            word.word=objKeys[i];
            arr.push(word);
        }
        return arr;
    }

    getRate(right,wrong){
        let totalAnswer=right+ wrong;

        if(totalAnswer > 0)
        {
            return ((100*right)/totalAnswer).toFixed(2)
        }
        else{
            return 0;
        }
    }

    generateQuestions(gameWords){
        let questions=[];
        for(let i=0;i<gameWords.length;i++){
            gameWords[i].rate=0;

            let totalAnswer=gameWords[i].rightAnswer+ gameWords[i].wrongAnswer;

            if(totalAnswer > 0)
            {
                gameWords[i].rate= this.getRate(gameWords[i].rightAnswer,gameWords[i].wrongAnswer);
            }

            if(Math.random()>0.5)
            {
                questions.push({
                    questionLanguage:gameWords[i].translationLanguage,
                    questionWord:gameWords[i].word,
                    questionAnswer:gameWords[i].translation,
                    questionRate:gameWords[i].rate,
                    index:gameWords[i].word
                });
            }
            else{
                questions.push({
                    questionLanguage:gameWords[i].language,
                    questionWord:gameWords[i].translation,
                    questionAnswer:gameWords[i].word,
                    questionRate:gameWords[i].rate,
                    index:gameWords[i].word
                });
            }
        }
        return questions;
    }

    nextQuestion(){
        let progress=this.state.gameProgress+1;

        if(progress===this.state.questions.length)
        {
            this.setState({
                gameProgress:progress,
                succeedScreen:false,
                failScreen:false
            });
        }
        else{
            this.setState({
                gameProgress:progress,
                currentQuestion:this.state.questions[progress],
                succeedScreen:false,
                failScreen:false
            });
        }
    }

    handleAnswer(e){
        const answer=this.answerInput.value;
        console.log("handle")
        if(answer.toLowerCase() === this.state.currentQuestion.questionAnswer.toLowerCase())
        {
            this.showSucceed();
            this.setState({isError:false});
            console.log(this.state.currentQuestion)
            this.props.updateStatistics(this.state.currentQuestion.index,1);
        }
    }

    checkAnswer(){
        const answer=this.answerInput.value;
        if(answer !== undefined && answer && answer.length>0)
        {
            if(answer.toLowerCase() === this.state.currentQuestion.questionAnswer.toLowerCase())
            {
                this.showSucceed();
                this.setState({isError:false});
                this.props.updateStatistics(this.state.currentQuestion.index,1);
            }
            else{
                this.setState({isError:true});
            }
        }
        else{
            this.setState({isError:true})
        }
    }

    skipQuestion(){
        this.props.updateStatistics(this.state.currentQuestion.index,-1);
        this.showFail();
    }

    showSucceed(){
        this.setState({succeedScreen:true});
    }

    showFail(){
        this.setState({failScreen:true});
    }

    switchColorWeight(weight){
        this.setState({colorWeight:weight});
    }

    renderQuestion(type){
        const siteLang=this.props.settings.siteLanguage;
        console.log(type)
        console.log(type===questionTypes.test)

        if(type === questionTypes.written)
        {
            return this.renderWrittenQuestion(siteLang);
        }
        else if(type===questionTypes.test)
        {
            return this.renderTestQuestion(siteLang);
        }
    }

    renderWrittenQuestion(siteLang)
    {
        return(
            <div className="question">
                <Card>
                    <CardPrimary>
                        <CardTitle large="true" >{language.game[siteLang].written_question}</CardTitle>
                        <CardSubtitle large="true" >
                            {this.state.currentQuestion.questionWord}
                        </CardSubtitle>
                        <div className="the-line"></div>
                        <div className="answer">
                            <TextField 
                                className={this.state.isError?"error" :""}
                                label={language.game[siteLang].txt_answer} 
                                fullwidth 
                                inputRef={input => this.answerInput=input} 
                                onChange={this.handleAnswer}
                            />
                        </div>
                    </CardPrimary>
                    <CardSupportingText>
                    </CardSupportingText>
                    <CardActions>
                        <CardAction onClick={this.checkAnswer}>{language.game[siteLang].btn_check}</CardAction>
                        <CardAction onClick={this.skipQuestion}>{language.game[siteLang].btn_skip}</CardAction>
                    </CardActions>
                </Card>
            </div>
        )
    }

    renderTestQuestion(siteLang)
    {
        return (
           <div className="question">
                asdf
           </div>
        )
    }

    renderSucceed(){
        const siteLang=this.props.settings.siteLanguage;
        let index=this.getRandomIndex(images.rightImages);
        return(
            <div className="succeed">
                <Card>
                    <CardMedia style={{backgroundImage: `url(${images.rightImages[index]})`}}></CardMedia>
                    <CardPrimary>
                        <CardTitle large="true">{language.game[siteLang].success}</CardTitle>
                    </CardPrimary>
                    <CardSupportingText>
                    </CardSupportingText>
                    <CardAction autoFocus onClick={this.nextQuestion}>{language.game[siteLang].summary_skip}</CardAction>
                </Card>
            </div> 
        )
    }

    renderFail(){
        const siteLang=this.props.settings.siteLanguage;
        let index=this.getRandomIndex(images.wrongImages);
        return(
            <div className="failure">
                <Card>
                    <CardMedia style={{backgroundImage: `url(${images.wrongImages[index]})`}}></CardMedia>
                    <CardPrimary>
                        <CardTitle large="true" >{language.game[siteLang].failure}</CardTitle>
                        <CardSubtitle>{this.state.currentQuestion.questionWord}</CardSubtitle>
                        <CardSubtitle>{this.state.currentQuestion.questionAnswer}</CardSubtitle>
                    </CardPrimary>
                    <CardSupportingText>
                    </CardSupportingText>
                    <CardAction autoFocus onClick={this.nextQuestion}>{language.game[siteLang].summary_skip}</CardAction>
                </Card>
            </div> 
        )
    }

    renderSummary(){
        const siteLang=this.props.settings.siteLanguage;
        return  (
            <section className="game">
                <div className="summary">
                <div className="continue-div"><Button unelevated onClick={this.restart}>{language.game[siteLang].end_screen_continue}</Button></div>
                {
                    this.state.questions.map((question,i)=>{
                    const color=Object.keys(colors)[this.getRandomIndex(Object.keys(colors))];
                    const word=this.props.words[question.index];
                    return (
                        <div 
                            key={i} 
                            className="summary-row" 
                            style={
                                {backgroundColor:colors[color][this.state.colorWeight]}
                                }
                            >
                            <span>{question.questionAnswer}</span>
                            <span>{question.questionWord}</span>
                            <span>%{this.getRate(word.rightAnswer,word.wrongAnswer)}</span>
                        </div>
                    );
                })}
                </div>
            </section>
        );
    }

    render(){
        if(this.state.gameProgress===this.state.questions.length)
        {
            return this.renderSummary();
        }
        else{
            let HTML="";
            if(this.state.succeedScreen)
            {
                HTML=this.renderSucceed();
            }
            else if(this.state.failScreen){
                HTML=this.renderFail();
            }
            else{
                HTML=this.renderQuestion(questionTypes.test);
            }
            return(
                <section className="game">
                    {HTML}
                </section>
            )
        }
    }
}

export default Game