import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Text,
  Button,
  Tooltip,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { courseworkScheduleStyles } from './CourseworkScheduleStyles';
import { CourseworkScheduleProps } from '../../../../types/admin/CreateModule/CourseworkSchedule';

import { Coursework } from '../../../../types/admin/CreateModule/CourseworkSetup';
import {
  calculateTotalTime,
  expectedTotalTime,
  handleInputBlurUtil,
  handleInputChangeUtil,
  initializeCourseworkList,
  recalculateCourseworkList,
} from '../../../../utils/admin/CreateModule/CourseworkSchedule';

const CourseworkSchedule: React.FC<CourseworkScheduleProps> = ({
  courseworkList = [],
  moduleCredit = 0,
  handleScheduleChange,
  templateData = [],
  handleCourseworkListChange,
  formFactor = 0,
  isEditing = false,
}) => {
  const [internalCourseworkList, setInternalCourseworkList] =
    useState<Coursework[]>(courseworkList);
  const isInitialized = useRef(false);

  useEffect(() => {
    const initialList = initializeCourseworkList(
      courseworkList,
      templateData,
      moduleCredit,
      formFactor,
      isEditing,
    );
    setInternalCourseworkList(initialList);
    handleCourseworkListChange(initialList);
    isInitialized.current = true;
  }, [
    courseworkList,
    templateData,
    moduleCredit,
    formFactor,
    isEditing,
    handleCourseworkListChange,
  ]);

  useEffect(() => {
    if (isEditing) {
      const recalculatedList = recalculateCourseworkList(
        internalCourseworkList,
        templateData,
        moduleCredit,
        formFactor,
      );
      setInternalCourseworkList(recalculatedList);
      handleCourseworkListChange(recalculatedList);
    }
  }, [
    moduleCredit,
    templateData,
    formFactor,
    isEditing,
    internalCourseworkList,
    handleCourseworkListChange,
  ]);

  const handleRestoreDefaults = () => {
    setInternalCourseworkList(courseworkList);
    handleCourseworkListChange(courseworkList);
  };

  return (
    <Box>
      <Button onClick={handleRestoreDefaults} mb={4} colorScheme="blue">
        Restore Defaults
      </Button>
      <Table style={courseworkScheduleStyles.table}>
        <Thead>
          <Tr>
            <Th style={courseworkScheduleStyles.th}>Activity</Th>
            {internalCourseworkList.map((coursework, index) => (
              <Th key={index} style={courseworkScheduleStyles.th}>
                {coursework.shortTitle} (Week: {coursework.deadlineWeek},
                Weight: {coursework.weight}%)
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>
              <Flex alignItems="center">
                Contact time: Lectures
                <Tooltip
                  label={`${formFactor}% (form factor) of contact time contributed to the coursework`}
                  aria-label="Form factor tooltip"
                >
                  <Icon as={QuestionOutlineIcon} ml={2} />
                </Tooltip>
              </Flex>
            </Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={coursework.contactTimeLectures ?? ''}
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeLectures',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeLectures',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>Contact time: Tutorials</Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={coursework.contactTimeTutorials ?? ''}
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeTutorials',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeTutorials',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>Contact time: Labs</Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={coursework.contactTimeLabs ?? ''}
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeLabs',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeLabs',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>Contact time: Seminars</Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={coursework.contactTimeSeminars ?? ''}
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeSeminars',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeSeminars',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>
              Contact time: Fieldwork Placement
            </Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={coursework.contactTimeFieldworkPlacement ?? ''}
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeFieldworkPlacement',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeFieldworkPlacement',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>Contact time: Others</Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={coursework.contactTimeOthers ?? ''}
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeOthers',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'contactTimeOthers',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>
              Linked formative assessment (if applicable)
            </Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={coursework.formativeAssessmentTime ?? ''}
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'formativeAssessmentTime',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'formativeAssessmentTime',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>Private study</Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={
                    typeof coursework.privateStudyTime === 'number'
                      ? coursework.privateStudyTime
                      : ''
                  }
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'privateStudyTime',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'privateStudyTime',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                  disabled={coursework.type !== 'exam'}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>Preparation time</Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={
                    typeof coursework.preparationTime === 'number'
                      ? coursework.preparationTime
                      : ''
                  }
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'preparationTime',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'preparationTime',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                  disabled={coursework.type === 'exam'}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>
              Keyboard Time (Actual hours on task)
            </Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={coursework.keyboardTime ?? ''}
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'keyboardTime',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'keyboardTime',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>Feedback time</Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Input
                  type="number"
                  value={coursework.feedbackTime ?? ''}
                  onChange={(e) =>
                    handleInputChangeUtil(
                      internalCourseworkList,
                      index,
                      'feedbackTime',
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                      handleScheduleChange,
                      setInternalCourseworkList,
                    )
                  }
                  onBlur={() =>
                    handleInputBlurUtil(
                      internalCourseworkList,
                      index,
                      'feedbackTime',
                      handleScheduleChange,
                    )
                  }
                  style={courseworkScheduleStyles.input}
                  disabled={coursework.type === 'exam'}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td style={courseworkScheduleStyles.td}>Total time</Td>
            {internalCourseworkList.map((coursework, index) => (
              <Td key={index} style={courseworkScheduleStyles.td}>
                <Text
                  style={{
                    color:
                      calculateTotalTime(coursework) ===
                      expectedTotalTime(coursework.weight || 0, moduleCredit)
                        ? 'green'
                        : calculateTotalTime(coursework) >
                            expectedTotalTime(
                              coursework.weight || 0,
                              moduleCredit,
                            )
                          ? 'red'
                          : 'inherit',
                  }}
                >
                  {calculateTotalTime(coursework)} /{' '}
                  {expectedTotalTime(coursework.weight || 0, moduleCredit)}
                  {calculateTotalTime(coursework) >
                    expectedTotalTime(coursework.weight || 0, moduleCredit) && (
                    <Text as="span" style={{ color: 'red' }}>
                      {' '}
                      (Warning: Exceeds expected time!)
                    </Text>
                  )}
                  {calculateTotalTime(coursework) <
                    expectedTotalTime(coursework.weight || 0, moduleCredit) && (
                    <Text as="span" style={{ color: 'red' }}>
                      {' '}
                      (Warning: Below expected time!)
                    </Text>
                  )}
                </Text>
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default CourseworkSchedule;
