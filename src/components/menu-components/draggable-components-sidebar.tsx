import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion'
import { EditorBtns } from '../../pages/const'
import React from 'react'
import TextPlaceholder from './text-placeholder'
import ContainerPlaceholder from './container-placeholder'
import VideoPlaceholder from './video-placeholder'
import TwoColumnsPlaceholder from './two-columns-placeholder'
import LinkPlaceholder from './link-placeholder'
import ContactFormComponentPlaceholder from './contact-form-placeholder'
import CheckoutPlaceholder from './checkout-placeholder'
import InputPlaceholder from './input-field-placeholder'
import HeaderPlaceholder from './header-section-placeholder'
import HeroPlaceholder from './hero-section-placeholder'
import ValPlaceholder from './value-section-placeholder'
import TestPlaceholder from './testimonial-section-placeholder'
import FeaturePlaceholder from './feature-section-placeholder'
import FooterPlaceholder from './footer-section-placeholder'
import ButtonPlaceholder from './button-placeholder'
import ButtonsetPlaceholder from './button-set-placeholder'
import LoadingPlaceholder from './load-section-placeholder'
import CartoonPlaceholder from './cartoons-placeholder'
import TexthoverPlaceholder from './text-hover-placeholder'
import GreetingsPlaceholder from './greetings-section-placeholder'
import LaserPlaceholder from './laser-placeholder'
import GraphsPlaceholder from './graphs-placeholder'
import NavbarPlaceholder from './navbar-placeholder'
import GDPlaceholder from './gridsandcards-placeholder'
import ModalsPlaceholder from './modals-placeholder'
import SearchPlaceholder from './search-placeholder'
import TCPlaceholder from './tc-placeholder'
import StepsPlaceholder from './steps-placeholder'
import SMPlaceholder from './sm-placeholder'
import StackPlaceholder from './stack-placeholder'
import SigninPlaceholder from './signin-placeholder'
import SignupPlaceholder from './signup-section-placeholder'



type Props = {}

const ComponentsTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode
    label: string
    id: EditorBtns
    group: 'layout' | 'Basic elements' | 'landing page elements' |'Advanced-elements'
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: 'Text',
      id: 'text',
      group: 'Basic elements',
    },
    {
      Component: <HeaderPlaceholder />,
      label: 'Header',
      id: 'header',
      group: 'landing page elements',
    },
    {
      Component: <HeroPlaceholder />,
      label: 'Hero',
      id: 'hero',
      group: 'landing page elements',
    },
    {
      Component: <GraphsPlaceholder />,
      label: 'Graphs',
      id: 'graph',
      group: 'Advanced-elements',
    },
    {
      Component: <NavbarPlaceholder />,
      label: 'Navbar',
      id: 'navbars',
      group: 'Advanced-elements',
    },
    {
      Component: <ValPlaceholder />,
      label: 'Value',
      id: 'value',
      group: 'landing page elements',
    },
    {
      Component: <FeaturePlaceholder />,
      label: 'Features',
      id: 'features',
      group: 'landing page elements',
    },
    { 
      Component: <FooterPlaceholder />,
      label: 'Footer',
      id: 'footer',
      group: 'landing page elements',
    },
    {
      Component: <CartoonPlaceholder />,
      label: 'Animations',
      id: 'cartoons',
      group: 'landing page elements',
    },
    {
      Component: <GreetingsPlaceholder />,
      label: 'Greetings',
      id: 'greetings',
      group: 'landing page elements',
    },
    {
      Component: <LaserPlaceholder />,
      label: 'Lasers',
      id: 'lasers',
      group: 'landing page elements',
    },
    {
      Component: <TexthoverPlaceholder />,
      label: 'Scenic Text',
      id: 'texthover',
      group: 'landing page elements',
    },
    {
      Component: <LoadingPlaceholder />,
      label: 'Loading',
      id: 'loading',
      group: 'landing page elements',
    },
    {
      Component: <ButtonsetPlaceholder />,
      label: 'Button set',
      id: 'buttonset',
      group: 'landing page elements',
    },
    {
      Component: <TestPlaceholder />,
      label: 'Testimonials',
      id: 'testimonial',
      group: 'landing page elements',
    },
    {
      Component: <InputPlaceholder />,
      label: 'Input',
      id: 'inputfield',
      group: 'Basic elements',
    },
    {
      Component: <ButtonPlaceholder />,
      label: 'Button',
      id: 'button',
      group: 'Basic elements',
    },
    {
      Component: <ContainerPlaceholder />,
      label: 'Container',
      id: 'container',
      group: 'layout',
    },
    {
      Component: <TwoColumnsPlaceholder />,
      label: '2 Columns',
      id: '2Col',
      group: 'layout',
    },
    {
      Component: <StackPlaceholder />,
      label: 'Stack',
      id: 'stack',
      group: 'layout',
    },
    {
      Component: <VideoPlaceholder />,
      label: 'Media',
      id: 'video',
      group: 'Basic elements',
    },
    {
      Component: <ContactFormComponentPlaceholder />,
      label: 'Contact',
      id: 'contactForm',
      group: 'Basic elements',
    },
    {
      Component: <GDPlaceholder />,
      label: 'Grids and Cards',
      id: 'gridsandcards',
      group: 'Advanced-elements',
    },
    {
      Component: <ModalsPlaceholder />,
      label: 'Carousel',
      id: 'modals',
      group: 'Advanced-elements',
    },
    {
      Component: <SearchPlaceholder />,
      label: 'Search',
      id: 'search',
      group: 'Advanced-elements',
    },
    {
      Component: <TCPlaceholder />,
      label: 'Tabs and Accordions',
      id: 'tc',
      group: 'Advanced-elements',
    },
    {
      Component: <CheckoutPlaceholder />,
      label: 'Checkout',
      id: 'paymentForm',
      group: 'Basic elements',
    },
    {
      Component: <StepsPlaceholder />,
      label: 'Steps',
      id: 'steps',
      group: 'Advanced-elements',
    },
    {
      Component: <SMPlaceholder />,
      label: 'Social Media',
      id: 'sm',
      group: 'Advanced-elements',
    },
    {
      Component: <SigninPlaceholder />,
      label: 'Sign In',
      id: 'signin',
      group: 'Advanced-elements',
    },
    {
      Component: <SignupPlaceholder />,
      label: 'Sign Up',
      id: 'signup',
      group: 'Advanced-elements',
    },

  ]

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Layout', 'Elements','Pre Made Website Templates']}
    >
      <AccordionItem
        value="Layout"
        className="px-6 py-0 border-y-[1px]"
      >
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'layout')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>


      <AccordionItem
        value="Elements"
        className="px-6 py-0 "
      >
        <AccordionTrigger className="!no-underline">Basic Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'Basic elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="Website Structures"
        className="px-6 py-0 "
      >
        <AccordionTrigger className="!no-underline">Landing Page Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'landing page elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>


      <AccordionItem
        value="Advanced-elements"
        className="px-6 py-0 "
      >
        <AccordionTrigger className="!no-underline">Advanced Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'Advanced-elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>


    </Accordion>
  )
}

export default ComponentsTab