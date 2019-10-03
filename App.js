import React, { Component } from "react"
import Joueur from "./components/joueurs"
import Equipe from "./components/equipe"
import Timer from "./components/timer"
import Chrono from "./components/chrono"
import ModalJoueur from "./components/modalJoueur"
import { Button, Text, TextInput, StyleSheet, View } from "react-native"
import SwipeableViews from "react-swipeable-views-native"
import Cage from "./components/cage"

const apiIP = "http://192.168.1.155:3000"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      ratios: {},
      pause: [],
      resume: [],
      event: [],
      minutes: 0,
      seconds: 0,
      startPeriodTimer: [],
      endPeriodTimer: [],
      matchState: "noStarted",
      period: 1,
      joueurs: [],
      joueursOnGround: Array(14)
        .fill(null)
        .map((x, i) => ({
          id: i,
          numero: null,
          nom: null,
          "d+": 0,
          "d-": 0,
          "a+": 0,
          "a-": 0,
          "p+": 0,
          "p-": 0,
          "+": 0,
          ".": 0,
          onGround: false
        })),
      modalVisible: false
    }
    this.updateJoueur = this.updateJoueur.bind(this)
    this.newJoueur = this.newJoueur.bind(this)
    this.addToJoueur = this.addToJoueur.bind(this)
    this.startPeriod = this.startPeriod.bind(this)
    this.addPause = this.addPause.bind(this)
    this.addResume = this.addResume.bind(this)
    this.zeroPad = this.zeroPad.bind(this)
    this.tick = this.tick.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.sendEventToBack = this.sendEventToBack.bind(this)
  }
  componentDidMount() {
    this.callAPI()
  }
  callAPI() {
    fetch(apiIP + "/users")
      .then(res => res.json())
      .then(
        result => {
          result.forEach(joueur => {
            joueur["d+"] = 0
            joueur["d-"] = 0
            joueur["a+"] = 0
            joueur["a-"] = 0
            joueur["p+"] = 0
            joueur["p-"] = 0
            joueur["+"] = 0
            joueur["."] = 0
            joueur.onGround = false
          })
          this.setState({
            isLoaded: true,
            joueurs: result
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          })
        }
      )
  }

  startPeriod = () => {
    this.interval = setInterval(() => {
      this.tick()
    }, 1000)
    const curState = "running"
    let startPeriodTimer = this.state.startPeriodTimer
    startPeriodTimer.push(new Date())
    this.setState({ startPeriodTimer: startPeriodTimer, matchState: curState })
  }
  endPeriod = () => {
    clearInterval(this.interval)
    let curState
    let curPeriod = this.state.period
    if (curPeriod == 1) {
      curState = "half"
    } else {
      curState = "end"
    }
    curPeriod++
    let endPeriodTimer = this.state.endPeriodTimer
    endPeriodTimer.push(new Date())
    this.setState({
      endPeriodTimer: endPeriodTimer,
      matchState: curState,
      period: curPeriod,
      seconds: 0,
      minutes: 0
    })
    this.resizeEvents().then(function(event) {
      this.sendEventToBack()
    })
  }
  sendEventToBack = () => {
    fetch(apiIP + "/event", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.events)
    })
  }
  resizeEvents = () => {
    return new Promise(resolve => {
      resizeTime(
        this.state.startPeriodTimer,
        this.state.endPeriodTimer,
        this.state.pause,
        this.state.resume
      ).then(function(ratios) {
        this.setState({
          ratios: ratios
        })
        let events = this.state.event
        events.forEach(event => {
          event.timer = calculateTimer(event.time, this.state.ratios)
        })
        this.setState({ events: events })
        resolve(events)
      })
    })
  }
  addPause = () => {
    clearInterval(this.interval)
    const curState = "paused"
    let pause = this.state.pause
    pause.push(new Date())
    this.setState({
      pause: pause,
      matchState: curState
    })
  }
  addResume = () => {
    this.interval = setInterval(() => {
      this.tick()
    }, 1000)
    const curState = "running"
    let resume = this.state.resume
    resume.push(new Date())
    this.setState({
      resume: resume,
      matchState: curState
    })
  }
  tick = () => {
    let seconds = this.state.seconds + 1
    let minutes = this.state.minutes
    if (seconds === 60) {
      seconds = 0
      minutes = minutes + 1
    }
    this.setState({
      seconds: seconds,
      minutes: minutes
    })
  }

  zeroPad = value => {
    return value < 10 ? `0${value}` : value
  }

  updateJoueur = (id, joueur) => {
    let joueurs = this.state.joueurs
    let curJoueur = joueurs.find(joueur => joueur.id === id)
    if (joueur.numero) {
      curJoueur.numero = joueur.numero
    }
    if (joueur.nom) {
      curJoueur.nom = joueur.nom
    }
    if (curJoueur.nom && curJoueur.numero) {
      this.createJoueur(curJoueur)
    }
    this.setState({
      joueurs: joueurs
    })
  }
  createJoueur = joueur => {
    fetch(apiIP + "/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nom: joueur.nom,
        numero: joueur.numero,
        id: joueur.id
      })
    }).then(res => console.log(res))
  }
  newJoueur = event => {
    const joueurs = this.state.joueurs
    this.setState({
      joueurs: joueurs.concat({
        id: newID(joueurs),
        numero: null,
        nom: null,
        "d+": 0,
        "d-": 0,
        "a+": 0,
        "a-": 0,
        "p+": 0,
        "p-": 0,
        "+": 0,
        ".": 0,
        onGround: false
      })
    })
  }
  addToJoueur(key, id) {
    const joueurs = this.state.joueurs
    const curJoueur = joueurs.find(joueur => joueur.id === id)
    if (key == "onGround") {
      curJoueur[key] = !curJoueur[key]
    } else {
      curJoueur[key]++
    }
    this.addEvent(key, id)
    this.setState({
      joueurs: joueurs
    })
  }
  addEvent(key, id) {
    const events = this.state.event
    events.push({ joueur: id, key: key, time: new Date() })
    this.setState({
      event: events
    })
  }
  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  render() {
    return (
      <SwipeableViews enableMouseEvents>
        <View style={styles.container}>
          <ModalJoueur
            modalVisible={this.state.modalVisible}
            setModalVisible={this.setModalVisible}
          />
          <View style={styles.container}>
            <Chrono
              zeroPad={this.zeroPad}
              minutes={this.state.minutes}
              seconds={this.state.seconds}
              matchState={this.state.matchState}
            />
          </View>
          <Timer
            addPause={this.addPause}
            addResume={this.addResume}
            startPeriod={this.startPeriod}
            endPeriod={this.endPeriod}
            matchState={this.state.matchState}
          />
          <Equipe name={"A"} />
          <Equipe name={"B"} />
          <Button
            title="Show Modal"
            onPress={() => {
              this.setModalVisible(true)
            }}
          />

          <Button title="Ajouter Joueur" onPress={this.newJoueur} />

          <View
            style={{ flex: 6, alignItems: "center", justifyContent: "center" }}
          >
            {this.state.joueursOnGround.map(joueur => {
              return (
                <Joueur
                  key={joueur.id}
                  id={joueur.id}
                  nom={joueur.nom}
                  numero={joueur.numero}
                  onGround={joueur.onGround}
                  onUpdateJoueur={this.updateJoueur}
                  onAdd={this.addToJoueur}
                />
              )
            })}
          </View>
        </View>
        <Cage />
      </SwipeableViews>
    )
  }
}

function newID(object) {
  return Math.max(...object.map(d => d.id)) + 1
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})

function resizeTime(starts, ends, pauses, resumes) {
  return new Promise(resolve => {
    let dureePeriod = 0
    let ratios = []
    if (pauses.length > 0) {
      dureePeriod = parseInt((ends[0] - starts[0]) / 1000)
      for (var i = 0; i < resumes.length; i++) {
        if (pauses[i] <= ends[0]) {
          dureePeriod -= parseInt((resumes[i] - pauses[i]) / 1000)
        } else {
          break
        }
      }
      ratios.push({
        ratio: (30 * 60) / dureePeriod,
        start: starts[0],
        end: ends[0]
      })
      dureePeriod = 0
      dureePeriod += parseInt((ends[1] - starts[1]) / 1000)
      for (let i = 0; i < resumes.length; i++) {
        if (pauses[i] >= starts[1]) {
          dureePeriod -= parseInt((resumes[i] - pauses[i]) / 1000)
        }
      }
      ratios.push({
        ratio: (30 * 60) / dureePeriod,
        start: starts[1],
        end: ends[1]
      })
    } else {
      ratios.push({
        ratio: (30 * 60) / parseInt((ends[0] - starts[0]) / 1000),
        start: starts[0],
        end: ends[0]
      })
      ratios.push({
        ratio: (30 * 60) / parseInt((ends[1] - starts[1]) / 1000),
        start: starts[1],
        end: ends[1]
      })
    }
    resolve(ratios)
  })
}

function calculateTimer(event, ratios) {
  if (event.time >= ratios[0].start && event.time <= ratios[0].end) {
    return parseInt((event.time - ratios[0].start) / 1000) * ratios[0].ratio
  } else {
    return parseInt((event.time - ratios[1].start) / 1000) * ratios[1].ratio
  }
}
