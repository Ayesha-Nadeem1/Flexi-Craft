import React from 'react';
import { EditorElement } from '../../pages/editor-provider';
import TextComponent from './text';
import Container from './container';
import VideoComponent from './vid';
import ContactFormComponent from './contact-form';
import Checkout from './checkout';
import InputComponent from './input';
import HeaderComponent from './header';
import HeroSection from './hero';
import ValuePropositionSection from './value';
import TestimonialComponent from './testimonial';
import FeaturesSection from './features';
import FooterSection from './footer';
import ButtonSection from './Button';
import ButtonSet from './buttonset';
import Loading from './loading';
import Animations from './animations';
import Texthover from './texthover';
import TextAnimation from './greetings';
import Laser from './lasers';
import Graphs from './graphs';
import NavbarEditor from './navs';
import GD from './GD';
import Modals from './modals';
import SearchSection from './Search';
import TabsAndAccordions from './tc';
import StepsSection from './steps';
import SMSection from './sm';
import ImageComponent from './img';
import Stack from './stack';
import SignIn from './Sign In';
import SignUp from './Sign up';

// Use React.memo to optimize re-renders by memoizing components
const Component_distributor = React.memo(({ element, onDrop, onDelete }: { element: EditorElement, onDrop: (element: EditorElement) => void, onDelete: (elementId: string, element: EditorElement) => void }) => {
  const renderComponent = () => {
    console.log('Distributing Props:', { element, onDrop, onDelete }); // Debugging
    switch (element.type) {
      case 'text':
        return <TextComponent element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'container':
        return <Container element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'video':
        return <VideoComponent element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'contactForm':
        return <ContactFormComponent element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'paymentForm':
        return <Checkout element={element} onDrop={onDrop} onDelete={onDelete} />;
      case '2Col':
        return <Container element={element} onDrop={onDrop} onDelete={onDelete} />;
      case '__body':
        return <Container element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'inputfield':
        return <InputComponent element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'header':
        return <HeaderComponent element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'hero':
        return <HeroSection element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'value':
        return <ValuePropositionSection element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'testimonial':
        return <TestimonialComponent element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'features':
        return <FeaturesSection element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'footer':
        return <FooterSection element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'button':
        return <ButtonSection element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'buttonset':
        return <ButtonSet element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'loading':
        return <Loading element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'cartoons':
        return <Animations element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'texthover':
        return <Texthover element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'greetings':
        return <TextAnimation element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'lasers':
        return <Laser element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'graph':
        return <Graphs element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'navbars':
        return <NavbarEditor element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'gridsandcards':
        return <GD element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'modals':
        return <Modals element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'search':
        return <SearchSection element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'tc':
        return <TabsAndAccordions element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'steps':
        return <StepsSection element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'sm':
        return <SMSection element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'urlimg':
        return <ImageComponent element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'stack':
        return <Stack element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'signin':
        return <SignIn element={element} onDrop={onDrop} onDelete={onDelete} />;
      case 'signup':
        return <SignUp element={element} onDrop={onDrop} onDelete={onDelete} />;
      default:
        return null;
    }
  };

  return renderComponent();
});

export default Component_distributor;
