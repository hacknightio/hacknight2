'use strict'
const Alexa = require('ask-sdk-core')
const skillBuilder = Alexa.SkillBuilders.custom()

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    console.log(
      'can log:',
      handlerInput.requestEnvelope.request.type === 'LaunchRequest',
      handlerInput.requestEnvelope.request.type
    )
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    const speechText = 'Loading the cannons'
    console.log('fool!', JSON.stringify(handlerInput, null, 2))
    if (supportsDisplay(handlerInput)) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .addVideoAppLaunchDirective(
          'https://s3.us-east-2.amazonaws.com/cannonfire/tripleGunsNoWords.mp4'
        )
        .getResponse()
    }
    return (
      handlerInput.responseBuilder
        .speak(speechText)
        // .addVideoAppLaunchDirective(
        //   'https://s3.us-east-2.amazonaws.com/cannonfire/tripleGunsNoWords.mp4'
        // )
        .getResponse()
    )
  }
}
function supportsDisplay(handlerInput) {
  var hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces
      .Display

  console.log(
    'Supported Interfaces are' +
      JSON.stringify(
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces
      )
  )
  return hasDisplay
}

exports.fire = skillBuilder.addRequestHandlers(LaunchRequestHandler).lambda()
