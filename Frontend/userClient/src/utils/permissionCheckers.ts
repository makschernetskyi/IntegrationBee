export async function checkMicrophonePermission() {
	try {
		//@ts-expect-error not really compatible with typescript
		const result = await navigator.permissions.query({ name: 'microphone' });
		if (result.state === 'granted') {
		return true
		} else if (result.state === 'denied') {
		return false
		} else {
		return false
		}
	} catch (error) {
		return false
	}
  }