
'use client'
import { Button } from '../components/ui/button'
import clsx from 'clsx'
import { EyeOff, ListCollapseIcon, CodeIcon } from 'lucide-react'
import React, { useEffect, useState,forwardRef, useImperativeHandle, useRef } from 'react'
import Component_distributor from '../components/editor-components/component_distributor'
import JSZip from 'jszip';
import { saveAs } from 'file-saver'
import { generatecontactCode } from '../components/editor-components/contact-form' // Import generateCode
import { EditorElement, useEditor } from './editor-provider'
import { generatebuttonCode } from '../components/editor-components/Button'
import { generateValuePropositionCode } from '../components/editor-components/value'
import { generateMediaComponentCode } from '../components/editor-components/vid'
import { generateTexthoverCode } from '../components/editor-components/texthover'
import { generateTextComponentCode } from '../components/editor-components/text'
import { generateTestimonialComponentCode } from '../components/editor-components/testimonial'
import { generateTCCode } from '../components/editor-components/tc'
import { exportToCodesteps } from '../components/editor-components/steps'
import { exportTosmCode } from '../components/editor-components/sm'
import { exportTosuCode } from '../components/editor-components/Sign up'
import { exportTosiCode } from '../components/editor-components/Sign In'
import { exportTosearchCode } from '../components/editor-components/Search'
import { exportToloadCode } from '../components/editor-components/loading'
import { exportTonavCode } from '../components/editor-components/navs'
import { exportToLaserAnimationCode } from '../components/editor-components/lasers'
import { exportToInputCode } from '../components/editor-components/input'
import { exportToHeroSectionCode } from '../components/editor-components/hero'
import { exportToHeaderComponentCode } from '../components/editor-components/header'
import { exportToTextAnimationCode } from '../components/editor-components/greetings'
import { exportToGridAndCardsCode } from '../components/editor-components/GD'
import { exportToFooterComponentCode } from '../components/editor-components/footer'
import { exportToFeaturesSectionCode } from '../components/editor-components/features'
import { exportToCheckoutCode } from '../components/editor-components/checkout'
import { exportToButtonSetCode } from '../components/editor-components/buttonset'
import { exportToAnimationSetCode } from '../components/editor-components/animations'
import { useSocket } from '../SocketContext'; // Import the useSocket hook
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


type Props = {
liveMode?: boolean;
roomId: string;
element: EditorElement
onLiveModeChange: (liveMode: boolean) => void; // Callback to notify parent
};

const EditorContent = forwardRef<HTMLDivElement, Props>(({ liveMode, element, onLiveModeChange }, ref) => {

const socket = useSocket(); // Get socket instance from context
const localRef = useRef<HTMLDivElement | null>(null)
// Expose the local ref to the parent component
useImperativeHandle(ref, () => localRef.current!);

const ACTIONS = {
COMPONENT_DROPPED: 'componentDropped',
COMPONENT_DELETED: 'componentDeleted',
};

const { id, content, name, styles, type } = element|| {};
const { dispatch, state } = useEditor()
const navigate = useNavigate();
const { roomId } = useParams();
const [livemode, setLiveMode] = useState(false);


useEffect(() => {
onLiveModeChange(livemode);
}, [livemode, onLiveModeChange]);

const toggleLiveMode = () => {
setLiveMode((prev) => !prev);
};

useEffect(() => {
if (!socket) {
console.error('Socket instance not available in EditorContent.');
return;
}

function handleErrors(e: any) {
console.log('Socket error:', e);
toast.error('Socket connection failed, try again later.');
navigate('/');
}

socket.on('connect_error', handleErrors);
socket.on('connect_failed', handleErrors);

return () => {
socket.off('connect_error', handleErrors);
socket.off('connect_failed', handleErrors);
};
}, [socket, roomId, navigate]);

useEffect(() => {
  const handleSyncState = () => {
    const currentState = state.editor.elements
    console.log('cs ec')

    dispatch({
      type: 'LOAD_DATA_LS',
      payload: { elements: currentState },
    });
  
    socket.on('getstatus', handleSyncState);
  };
  
  socket.on('getstatus', handleSyncState);
  
  // Cleanup the listener on unmount
  return () => {
  socket.off('getstatus', handleSyncState);
  };
  }, [socket, dispatch]);


useEffect(() => {
    const handleComponentDropped = ({ roomId, componentData }: { roomId: string; componentData: any }) => {
      toast.success("A user dropped a component");
    };
  
    const handleComponentDeleted = ({ roomId, componentData }: { roomId: string; componentData: any }) => {
      toast.success("A user removed a component");
    };
  
    const handleComponentUpdating = ({ roomId, componentId }: { roomId: string; componentId: string }) => {
      //toast.success(`Updating component`);
    };
  
    // Listen for events
    socket.on(ACTIONS.COMPONENT_DROPPED, handleComponentDropped);
    socket.on(ACTIONS.COMPONENT_DELETED, handleComponentDeleted);
    socket.on('textUpdated', handleComponentUpdating);
  
    // Cleanup listeners on unmount
    return () => {
      socket.off(ACTIONS.COMPONENT_DROPPED, handleComponentDropped);
      socket.off(ACTIONS.COMPONENT_DELETED, handleComponentDeleted);
      socket.off('textUpdated', handleComponentUpdating);
    };
  }, [socket, dispatch]);
  

useEffect(() => {
const handleSyncState = ({ roomId, updatedElements }: { roomId: string; updatedElements: any }) => {
console.log(`EC Sync event received for Room ID: ${roomId}`, updatedElements);
console.log("EC Updated elements: ", updatedElements)

let parsedElements;
try {
parsedElements = typeof updatedElements === 'string' ? JSON.parse(updatedElements) : updatedElements;
} catch (err) {
console.error('Failed to parse updated elements:', err);
return;
}

console.log('Recent elements:', parsedElements);
dispatch({
type: 'LOAD_DATA_S',
payload: { elements: parsedElements },
});
};

socket.on('syncState', handleSyncState);

// Cleanup the listener on unmount
return () => {
socket.off('syncState', handleSyncState);
};
}, [socket, dispatch]);




useEffect(() => {
if (liveMode) {
dispatch({
type: 'TOGGLE_LIVE_MODE',
payload: { value: true },
})
}
}, [liveMode])

useEffect(() => {
const savedEditorData = localStorage.getItem('editorElements')

if (savedEditorData) {
const parsedData = JSON.parse(savedEditorData)
dispatch({
type: 'LOAD_DATA_LS',
payload: {
elements: parsedData,
},
})
}
}, [dispatch])

const handleClick = () => {
dispatch({
type: 'CHANGE_CLICKED_ELEMENT',
payload: {},
})
}

const handleUnpreview = () => {
dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
dispatch({ type: 'TOGGLE_LIVE_MODE' })

}

const exportToCode = () => {
if (state.editor.elements.length === 0) {
window.alert("No components on canvas");
return;
}

const zip = new JSZip();

// Log the elements to check their structure
console.log(state.editor.elements);

// Iterate through the elements and generate the code for each component
state.editor.elements.forEach((element) => {
let componentCode = '';

// Check the type of the element and generate the code accordingly
switch (element.type) {
case '__body': // Main Body component
componentCode = generateBodyCode(element);
break;
case 'contactForm':
componentCode = generatecontactCode(element); // Handle contact form
break;
case 'button':
componentCode = generatebuttonCode(element);
break;
case 'value':
componentCode = generateValuePropositionCode(element);
break;
case 'video':
componentCode = generateMediaComponentCode(element);
break;
case 'texthover':
componentCode = generateTexthoverCode(element);
break;
case 'text':
componentCode = generateTextComponentCode(element);
break;
case 'testimonial':
componentCode = generateTestimonialComponentCode(element);
break;
case 'tc':
componentCode = generateTCCode(element);
break;
case 'steps':
componentCode = exportToCodesteps(element);
break;
case 'sm':
componentCode = exportTosmCode(element);
break;
case 'signup':
componentCode = exportTosuCode(element);
break;
case 'signin':
componentCode = exportTosiCode(element);
break;
case 'search':
componentCode = exportTosearchCode(element);
break;
case 'loading':
componentCode = exportToloadCode(element);
break;
case 'navbars':
componentCode = exportTonavCode(element);
break;
case 'lasers':
componentCode = exportToLaserAnimationCode(element);
break;
case 'inputfield':
componentCode = exportToInputCode(element);
break;
case 'hero':
componentCode = exportToHeroSectionCode(element);
break;
case 'header':
componentCode = exportToHeaderComponentCode(element);
break;
case 'greetings':
componentCode = exportToTextAnimationCode(element);
break;
case 'gridsandcards':
componentCode = exportToGridAndCardsCode(element);
break;
case 'footer':
componentCode = exportToFooterComponentCode(element);
break;
case 'features':
componentCode = exportToFeaturesSectionCode(element);
break;
case 'paymentForm':
componentCode = exportToCheckoutCode(element);
break;
case 'buttonset':
componentCode = exportToButtonSetCode(element);
break;
case 'cartoons':
componentCode = exportToAnimationSetCode(element);

default:
componentCode = `<div>${element.name}</div>`; // Default case if type doesn't match any known type
}

// If no code was generated for the element, log it for debugging
if (!componentCode) {
console.log(`No code generated for element: ${JSON.stringify(element)}`);
}

zip.file(`${element.name}.jsx`, componentCode);
});

zip.generateAsync({ type: 'blob' }).then((content) => {
saveAs(content, 'React-components.zip');
});
};


// Adjust the generateBodyCode function to handle only the elements needed
const generateBodyCode = (element: EditorElement) => {
const bodyContent = element.content.map((childElement: EditorElement) => {
switch (childElement.type) {
case 'contactForm':
return generatecontactCode(childElement); // Generates the correct ContactForm JSX
case 'button':
return generatebuttonCode(childElement);
case 'value':
return generateValuePropositionCode(childElement);
case 'video':
return generateMediaComponentCode(childElement);
case 'texthover':
return generateTexthoverCode(childElement);
case 'text':
return generateTextComponentCode(childElement);
case 'testimonial':
return generateTestimonialComponentCode(childElement);
case 'tc':
return generateTCCode(childElement);
case 'steps':
return exportToCodesteps(childElement);
case 'sm':
return exportTosmCode(childElement);
case 'signup':
return exportTosuCode(childElement);
case 'signin':
return exportTosiCode(childElement);
case 'search':
return exportTosearchCode(childElement);
case 'loading':
return exportToloadCode(childElement);
case 'navbars':
return exportTonavCode(childElement);
case 'lasers':
return exportToLaserAnimationCode(childElement);
case 'inputfield':
return exportToInputCode(childElement);
case 'hero':
return exportToHeroSectionCode(childElement);
case 'header':
return exportToHeaderComponentCode(childElement);
case 'greetings':
return exportToTextAnimationCode(childElement);
case 'gridsandcards':
return exportToGridAndCardsCode(childElement);
case 'footer':
return exportToFooterComponentCode(childElement);
case 'features':
return exportToFeaturesSectionCode(childElement);
case 'paymentForm':
return exportToCheckoutCode(childElement);
case 'buttonset':
return exportToButtonSetCode(childElement);
case 'cartoons':
return exportToAnimationSetCode(childElement);

default:
return ''; // Only add specific elements you want in the output
}
}).join('\n'); // Ensures there's no leftover Link component

return `
import React from 'react';
${bodyContent}`;
};


return (


<div
className={clsx(
'use-automation-zoom-in h-full overflow-scroll mr-[385px] bg-background transition-all rounded-md',
{
'!p-0 !mr-0':
state.editor.previewMode === true || state.editor.liveMode === true,
'!w-[850px]': state.editor.device === 'Tablet',
'!w-[420px]': state.editor.device === 'Mobile',
'w-full': state.editor.device === 'Desktop',
}
)}
onClick={handleClick}
>
{state.editor.previewMode && state.editor.liveMode && (
<div className="absolute top-0 left-0 z-[100] p-6">
{/* EyeOff Button */}
<Button
variant={'ghost'}
size={'icon'}
className="w-6 h-6 bg-slate-600 p-[2px] mb-2"
onClick={handleUnpreview}
>
<EyeOff />
</Button>

{/* Code Button */}
<Button
size={'icon'}
className="mb-4" // Adjusted spacing
onClick={exportToCode}
>
<CodeIcon/>
</Button>

{/* Toggle Sidebar Visibility Button */}
<Button
size={'icon'}
className="mb-10" // Adjusted spacing
onClick={toggleLiveMode}
>
<ListCollapseIcon/>
</Button>
</div>

)}
<div ref={localRef}>
{Array.isArray(state.editor.elements) && 
state.editor.elements.map((childElement) => (
<Component_distributor
key={childElement.id}
element={childElement}

/>
))}
</div>


</div>
)
}
)
export default EditorContent
